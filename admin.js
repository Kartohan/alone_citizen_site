const config = window.ALONE_CITIZEN_SUPABASE || {};
const configured =
  Boolean(config.url) &&
  Boolean(config.anonKey) &&
  !String(config.url).includes("YOUR_") &&
  !String(config.anonKey).includes("YOUR_");
const client =
  configured && window.supabase
    ? window.supabase.createClient(config.url, config.anonKey)
    : null;
const bucket = config.storageBucket || "gallery-images";

const authPanel = document.querySelector("[data-auth-panel]");
const dashboard = document.querySelector("[data-dashboard]");
const loginForm = document.querySelector("[data-login-form]");
const loginStatus = document.querySelector("[data-login-status]");
const photoForm = document.querySelector("[data-photo-form]");
const formStatus = document.querySelector("[data-form-status]");
const formTitle = document.querySelector("[data-form-title]");
const deleteButton = document.querySelector("[data-delete-photo]");
const photoList = document.querySelector("[data-photo-list]");
const countLabel = document.querySelector("[data-count]");
const metrics = {
  pageViews: document.querySelector('[data-metric="pageViews"]'),
  photoViews: document.querySelector('[data-metric="photoViews"]'),
  visitors: document.querySelector('[data-metric="visitors"]'),
  published: document.querySelector('[data-metric="published"]'),
};

let photos = [];
let photoViewCounts = new Map();

function setStatus(element, message, isError = false) {
  element.textContent = message;
  element.style.color = isError ? "var(--danger)" : "var(--muted)";
}

function formatSupabaseError(error) {
  if (!error?.message) return "Something went wrong.";
  if (error.message.includes("permission denied for table gallery_photos")) {
    return "Permission denied for gallery_photos. Check that this login email exists in public.admin_users and matches Supabase Auth exactly.";
  }
  return error.message;
}

function requireClient() {
  if (client) return true;
  setStatus(
    loginStatus,
    "Supabase is not configured yet. Fill supabase-config.js first.",
    true,
  );
  return false;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function formValue(name) {
  return photoForm.elements[name]?.value?.trim() || "";
}

function resetForm() {
  photoForm.reset();
  photoForm.elements.id.value = "";
  photoForm.elements.storage_path.value = "";
  photoForm.elements.image_url.value = "";
  photoForm.elements.frame.value = "4 / 5";
  photoForm.elements.position.value = "50% 50%";
  photoForm.elements.published.checked = true;
  formTitle.textContent = "Add photo";
  deleteButton.disabled = true;
  setStatus(formStatus, "");
}

function editPhoto(photo) {
  photoForm.elements.id.value = photo.id;
  photoForm.elements.storage_path.value = photo.storage_path || "";
  photoForm.elements.image_url.value = photo.image_url || "";
  photoForm.elements.title_en.value = photo.title_en || photo.title || "";
  photoForm.elements.title_uk.value = photo.title_uk || "";
  photoForm.elements.meta_en.value = photo.meta_en || photo.meta || "";
  photoForm.elements.meta_uk.value = photo.meta_uk || "";
  photoForm.elements.text_en.value = photo.text_en || photo.text || "";
  photoForm.elements.text_uk.value = photo.text_uk || "";
  photoForm.elements.theme.value = photo.theme || "sunset";
  photoForm.elements.sort_order.value = photo.sort_order ?? 0;
  photoForm.elements.frame.value = photo.frame || "4 / 5";
  photoForm.elements.position.value = photo.position || "50% 50%";
  photoForm.elements.gradient.value = photo.gradient || "";
  photoForm.elements.published.checked = Boolean(photo.published);
  formTitle.textContent = "Edit photo";
  deleteButton.disabled = false;
  setStatus(formStatus, "");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderPhotos() {
  countLabel.textContent = `${photos.length} photos`;
  metrics.published.textContent = photos.filter((photo) => photo.published).length;
  photoList.innerHTML = "";

  photos.forEach((photo) => {
    const row = document.createElement("article");
    row.className = "photo-row";

    const thumb = document.createElement("div");
    thumb.className = "photo-thumb";
    thumb.style.setProperty(
      "--thumb-gradient",
      photo.gradient || "linear-gradient(160deg, #222, #555)",
    );
    thumb.style.setProperty("--thumb-position", photo.position || "center");
    if (photo.image_url) {
      thumb.style.setProperty("--thumb-url", `url("${photo.image_url}")`);
    }

    const title = document.createElement("div");
    title.className = "photo-title";
    title.innerHTML = `<strong></strong><span></span>`;
    title.querySelector("strong").textContent = photo.title_en || photo.title || "Untitled";
    title.querySelector("span").textContent = `${photo.theme} / order ${photo.sort_order ?? 0}`;

    const views = document.createElement("div");
    views.className = "photo-views";
    views.textContent = `${photoViewCounts.get(photo.id) || 0} views`;

    const state = document.createElement("div");
    state.className = "photo-state";
    state.textContent = photo.published ? "Published" : "Draft";

    row.append(thumb, title, views, state);
    row.addEventListener("click", () => editPhoto(photo));
    photoList.appendChild(row);
  });
}

async function loadAnalytics() {
  const { data, error } = await client
    .from("analytics_events")
    .select("event_name,photo_id,visitor_id,created_at")
    .gte("created_at", new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString());

  if (error) throw error;

  const visitors = new Set();
  photoViewCounts = new Map();
  let pageViews = 0;
  let photoViews = 0;

  data.forEach((event) => {
    if (event.visitor_id) visitors.add(event.visitor_id);
    if (event.event_name === "page_view") pageViews += 1;
    if (event.event_name === "photo_view") {
      photoViews += 1;
      if (event.photo_id) {
        photoViewCounts.set(event.photo_id, (photoViewCounts.get(event.photo_id) || 0) + 1);
      }
    }
  });

  metrics.pageViews.textContent = pageViews;
  metrics.photoViews.textContent = photoViews;
  metrics.visitors.textContent = visitors.size;
}

async function loadPhotos() {
  const { data, error } = await client
    .from("gallery_photos")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  photos = data || [];
}

async function refresh() {
  if (!requireClient()) return;
  setStatus(formStatus, "Loading...");
  try {
    await Promise.all([loadPhotos(), loadAnalytics()]);
    renderPhotos();
    setStatus(formStatus, "");
  } catch (error) {
    setStatus(formStatus, formatSupabaseError(error), true);
  }
}

async function uploadImage(file) {
  const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const path = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${extension}`;
  const { error } = await client.storage.from(bucket).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;

  const { data } = client.storage.from(bucket).getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
}

async function savePhoto(event) {
  event.preventDefault();
  if (!requireClient()) return;

  setStatus(formStatus, "Saving...");
  try {
    const id = formValue("id");
    const file = photoForm.elements.image.files?.[0];
    let imageUrl = formValue("image_url");
    let storagePath = formValue("storage_path");

    if (file) {
      const uploaded = await uploadImage(file);
      imageUrl = uploaded.publicUrl;
      storagePath = uploaded.path;
    }

    if (!imageUrl) {
      throw new Error("Choose an image before saving a new photo.");
    }

    const payload = {
      title: formValue("title_en"),
      title_en: formValue("title_en"),
      title_uk: formValue("title_uk"),
      meta: formValue("meta_en"),
      meta_en: formValue("meta_en"),
      meta_uk: formValue("meta_uk"),
      text: formValue("text_en"),
      text_en: formValue("text_en"),
      text_uk: formValue("text_uk"),
      theme: formValue("theme"),
      sort_order: Number(formValue("sort_order") || 0),
      frame: formValue("frame") || "4 / 5",
      position: formValue("position") || "50% 50%",
      gradient: formValue("gradient"),
      published: photoForm.elements.published.checked,
      image_url: imageUrl,
      storage_path: storagePath,
    };

    const request = id
      ? client.from("gallery_photos").update(payload).eq("id", id)
      : client.from("gallery_photos").insert(payload);
    const { error } = await request;
    if (error) throw error;

    resetForm();
    await refresh();
    setStatus(formStatus, "Saved.");
  } catch (error) {
    setStatus(formStatus, formatSupabaseError(error), true);
  }
}

async function deletePhoto() {
  if (!requireClient()) return;
  const id = formValue("id");
  if (!id) return;
  const photo = photos.find((item) => item.id === id);
  const confirmed = window.confirm(`Delete ${photo?.title_en || "this photo"}?`);
  if (!confirmed) return;

  setStatus(formStatus, "Deleting...");
  try {
    const { error } = await client.from("gallery_photos").delete().eq("id", id);
    if (error) throw error;
    if (photo?.storage_path) {
      await client.storage.from(bucket).remove([photo.storage_path]);
    }
    resetForm();
    await refresh();
    setStatus(formStatus, "Deleted.");
  } catch (error) {
    setStatus(formStatus, error.message, true);
  }
}

async function showDashboard() {
  authPanel.classList.add("is-hidden");
  dashboard.classList.remove("is-hidden");
  await refresh();
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!requireClient()) return;
  const form = new FormData(loginForm);
  setStatus(loginStatus, "Signing in...");
  const { error } = await client.auth.signInWithPassword({
    email: form.get("email"),
    password: form.get("password"),
  });
  if (error) {
    setStatus(loginStatus, error.message, true);
  } else {
    setStatus(loginStatus, "");
    await showDashboard();
  }
});

photoForm.addEventListener("submit", savePhoto);
deleteButton.addEventListener("click", deletePhoto);
document.querySelector("[data-refresh]").addEventListener("click", refresh);
document.querySelector("[data-reset-form]").addEventListener("click", resetForm);
document.querySelector("[data-sign-out]").addEventListener("click", async () => {
  await client?.auth.signOut();
  dashboard.classList.add("is-hidden");
  authPanel.classList.remove("is-hidden");
});

async function init() {
  if (!requireClient()) return;
  const { data } = await client.auth.getSession();
  if (data.session) await showDashboard();
}

init();
