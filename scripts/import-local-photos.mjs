import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appPath = path.join(projectRoot, "app.js");
const assetsDir = path.join(projectRoot, "assets");

const env = {
  url: cleanEnv("SUPABASE_URL"),
  anonKey: cleanEnv("SUPABASE_ANON_KEY"),
  serviceRoleKey: cleanEnv("SUPABASE_SERVICE_ROLE_KEY"),
  email: cleanEnv("SUPABASE_ADMIN_EMAIL"),
  password: cleanEnv("SUPABASE_ADMIN_PASSWORD"),
  bucket: cleanEnv("SUPABASE_BUCKET") || "gallery-images",
};

const dryRun = process.argv.includes("--dry-run");
const replace = process.argv.includes("--replace");

if (!env.url || !env.anonKey) {
  fail("Set SUPABASE_URL and SUPABASE_ANON_KEY.");
}

if (!dryRun && !env.serviceRoleKey && (!env.email || !env.password)) {
  fail(
    "Set either SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ADMIN_EMAIL + SUPABASE_ADMIN_PASSWORD.",
  );
}

const photos = await loadFallbackPhotos();
const authToken = dryRun ? null : env.serviceRoleKey || (await signIn());
const existingPaths = dryRun ? new Set() : await fetchExistingStoragePaths(authToken);

let uploaded = 0;
let inserted = 0;
let skipped = 0;

for (const [index, photo] of photos.entries()) {
  const assetName = photo.url.replace(/^\.\/assets\//, "");
  const assetPath = path.join(assetsDir, assetName);
  const storagePath = `local/${assetName}`;

  if (!replace && existingPaths.has(storagePath)) {
    skipped += 1;
    console.log(`skip ${storagePath}`);
    continue;
  }

  const file = await readFile(assetPath);
  const mimeType = contentType(assetName);
  const publicUrl = `${env.url}/storage/v1/object/public/${env.bucket}/${encodePath(storagePath)}`;

  if (dryRun) {
    console.log(`dry-run ${storagePath}`);
    continue;
  }

  if (replace) {
    await deleteExistingPhoto(authToken, storagePath);
    await deleteExistingObject(authToken, storagePath);
  }

  await uploadObject(authToken, storagePath, file, mimeType);
  uploaded += 1;

  await insertPhoto(authToken, {
    title: photo.title,
    meta: photo.meta,
    text: photo.text,
    theme: photo.theme,
    gradient: photo.gradient,
    image_url: publicUrl,
    storage_path: storagePath,
    frame: photo.frame,
    position: photo.position,
    sort_order: index,
    published: true,
  });
  inserted += 1;

  console.log(`imported ${storagePath}`);
}

console.log(
  `done: ${inserted} inserted, ${uploaded} uploaded, ${skipped} skipped`,
);

async function loadFallbackPhotos() {
  const source = await readFile(appPath, "utf8");
  const match = source.match(/const fallbackPhotos = (\[[\s\S]*?\]);\n\nlet photos =/);
  if (!match) fail("Could not find fallbackPhotos in app.js.");

  const context = { fallbackPhotos: [] };
  vm.createContext(context);
  vm.runInContext(`fallbackPhotos = ${match[1]};`, context);
  return context.fallbackPhotos;
}

async function signIn() {
  const response = await fetch(`${env.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: env.anonKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: env.email,
      password: env.password,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    fail(`Supabase login failed: ${data.error_description || data.msg || response.statusText}`);
  }
  return data.access_token;
}

async function fetchExistingStoragePaths(token) {
  const response = await supabaseFetch(
    token,
    `/rest/v1/gallery_photos?select=storage_path`,
  );
  const rows = await response.json();
  return new Set(rows.map((row) => row.storage_path).filter(Boolean));
}

async function uploadObject(token, storagePath, body, mimeType) {
  await supabaseFetch(token, `/storage/v1/object/${env.bucket}/${encodePath(storagePath)}`, {
    method: "POST",
    headers: {
      "content-type": mimeType,
      "x-upsert": "false",
    },
    body,
  });
}

async function insertPhoto(token, payload) {
  await supabaseFetch(token, "/rest/v1/gallery_photos", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });
}

async function deleteExistingPhoto(token, storagePath) {
  await supabaseFetch(
    token,
    `/rest/v1/gallery_photos?storage_path=eq.${encodeURIComponent(storagePath)}`,
    { method: "DELETE" },
  );
}

async function deleteExistingObject(token, storagePath) {
  await supabaseFetch(token, `/storage/v1/object/${env.bucket}/${encodePath(storagePath)}`, {
    method: "DELETE",
  });
}

async function supabaseFetch(token, resource, options = {}) {
  const response = await fetch(`${env.url}${resource}`, {
    ...options,
    headers: {
      apikey: env.anonKey,
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    fail(`${options.method || "GET"} ${resource} failed: ${response.status} ${text}`);
  }

  return response;
}

function encodePath(value) {
  return value.split("/").map(encodeURIComponent).join("/");
}

function contentType(filename) {
  const extension = path.extname(filename).toLowerCase();
  if (extension === ".png") return "image/png";
  if (extension === ".webp") return "image/webp";
  if (extension === ".avif") return "image/avif";
  return "image/jpeg";
}

function cleanEnv(name) {
  const value = process.env[name];
  return value && value.trim();
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
