const photos = [
  {
    title: "Warm Horizon",
    theme: "sunset",
    meta: "Sunset / field light",
    text: "A soft golden scene for evening photos, with warm glow and slow airborne sparks.",
    gradient:
      "linear-gradient(160deg, #2f1a2d 0%, #a64d46 42%, #f2b05f 72%, #ffe1a8 100%)",
  },
  {
    title: "First Light",
    theme: "sunrise",
    meta: "Sunrise / pale air",
    text: "A cleaner morning preset with mist, gentle blue shadows, and a quiet amber edge.",
    gradient:
      "linear-gradient(155deg, #394d73 0%, #86a7c2 42%, #ffd6a1 76%, #fff0d6 100%)",
  },
  {
    title: "Cloud Drift",
    theme: "clouds",
    meta: "Clouds / moving sky",
    text: "Layered daylight motion for cloud studies, open skies, and changing weather.",
    gradient:
      "linear-gradient(150deg, #6e92b8 0%, #c9dbea 46%, #f6f1e8 62%, #7e9bb7 100%)",
  },
  {
    title: "Quiet Moon",
    theme: "moon",
    meta: "Moon / blue night",
    text: "The scene falls into a colder palette, with a visible moon and slow silver particles.",
    gradient:
      "linear-gradient(160deg, #060915 0%, #182845 48%, #566982 78%, #d6deec 100%)",
  },
  {
    title: "Star Field",
    theme: "stars",
    meta: "Stars / deep sky",
    text: "A darker star preset for night photos, with small parallax points and low contrast.",
    gradient:
      "radial-gradient(circle at 68% 24%, #dbe8ff 0 1%, transparent 2%), linear-gradient(160deg, #03040a 0%, #10172d 52%, #263356 100%)",
  },
  {
    title: "City Afterglow",
    theme: "city",
    meta: "City / evening lights",
    text: "Urban dusk colors, subtle window light, and a slower transition for city silhouettes.",
    gradient:
      "linear-gradient(160deg, #10121d 0%, #343348 44%, #be6c48 73%, #f2b56b 100%)",
  },
];

const themes = {
  sunset: {
    bgA: "#1b1420",
    bgB: "#6f3340",
    bgC: "#e89a54",
    accent: "#ffd49a",
    particle: "rgba(255, 213, 144, 0.78)",
    density: 58,
    speed: 0.28,
  },
  sunrise: {
    bgA: "#283852",
    bgB: "#83a5bd",
    bgC: "#f4ca93",
    accent: "#fff0c8",
    particle: "rgba(255, 242, 212, 0.74)",
    density: 46,
    speed: 0.22,
  },
  clouds: {
    bgA: "#496b91",
    bgB: "#9ab8cc",
    bgC: "#e8e2d8",
    accent: "#f8fbff",
    particle: "rgba(255, 255, 255, 0.48)",
    density: 34,
    speed: 0.18,
  },
  moon: {
    bgA: "#040711",
    bgB: "#13213d",
    bgC: "#44536c",
    accent: "#dcecff",
    particle: "rgba(221, 236, 255, 0.8)",
    density: 76,
    speed: 0.12,
  },
  stars: {
    bgA: "#03040a",
    bgB: "#0f1730",
    bgC: "#263350",
    accent: "#d9e6ff",
    particle: "rgba(235, 243, 255, 0.88)",
    density: 116,
    speed: 0.08,
  },
  city: {
    bgA: "#11131d",
    bgB: "#313244",
    bgC: "#bd6b49",
    accent: "#ffc178",
    particle: "rgba(255, 185, 103, 0.68)",
    density: 44,
    speed: 0.16,
  },
};

const experience = document.querySelector(".experience");
const stage = document.querySelector(".photo-stage");
const photoImage = document.querySelector(".photo-image");
const caption = {
  eyebrow: document.querySelector(".eyebrow"),
  title: document.querySelector(".caption h1"),
  text: document.querySelector(".caption-text"),
};
const filmstrip = document.querySelector(".filmstrip");
const tabs = [...document.querySelectorAll(".theme-tab")];
const canvas = document.querySelector(".sky-canvas");
const ctx = canvas.getContext("2d");
const addButton = document.querySelector(".add-button");
const dialog = document.querySelector(".add-dialog");
const closeButton = document.querySelector(".close-button");
const addForm = document.querySelector(".add-form");
const fileInput = document.querySelector(".file-input");
const titleInput = document.querySelector(".title-input");
const themeInput = document.querySelector(".theme-input");

let activeIndex = 0;
let activeFilter = "all";
let particles = [];
let width = 0;
let height = 0;

function filteredPhotos() {
  if (activeFilter === "all") return photos;
  return photos.filter((photo) => photo.theme === activeFilter);
}

function applyTheme(themeName) {
  const theme = themes[themeName] || themes.sunset;
  experience.dataset.theme = themeName;
  experience.style.setProperty("--bg-a", theme.bgA);
  experience.style.setProperty("--bg-b", theme.bgB);
  experience.style.setProperty("--bg-c", theme.bgC);
  experience.style.setProperty("--accent", theme.accent);
  rebuildParticles(theme);
}

function setPhoto(index, immediate = false) {
  const list = filteredPhotos();
  if (!list.length) return;
  activeIndex = (index + list.length) % list.length;
  const photo = list[activeIndex];

  stage.classList.add("is-changing");
  window.setTimeout(
    () => {
      applyTheme(photo.theme);
      photoImage.style.setProperty("--photo-gradient", photo.gradient);
      photoImage.classList.toggle("has-url", Boolean(photo.url));
      if (photo.url) {
        photoImage.style.setProperty("--photo-url", `url("${photo.url}")`);
      }
      photoImage.setAttribute("aria-label", `${photo.title}, ${photo.meta}`);
      caption.eyebrow.textContent = photo.meta;
      caption.title.textContent = photo.title;
      caption.text.textContent = photo.text;
      renderFilmstrip();
      stage.classList.remove("is-changing");
    },
    immediate ? 0 : 260,
  );
}

function renderFilmstrip() {
  const list = filteredPhotos();
  filmstrip.innerHTML = "";
  list.forEach((photo, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `thumb${index === activeIndex ? " is-active" : ""}`;
    button.setAttribute("aria-label", `Open ${photo.title}`);
    button.style.setProperty("--photo-gradient", photo.gradient);
    if (photo.url) {
      button.classList.add("has-url");
      button.style.setProperty("--photo-url", `url("${photo.url}")`);
    }
    button.addEventListener("click", () => setPhoto(index));
    filmstrip.appendChild(button);
  });
}

function move(direction) {
  setPhoto(activeIndex + direction);
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  const current = filteredPhotos()[activeIndex] || photos[0];
  rebuildParticles(themes[current.theme]);
}

function rebuildParticles(theme) {
  const count = Math.floor(theme.density * Math.min(1.4, Math.max(0.76, width / 1200)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.9 + 0.45,
    alpha: Math.random() * 0.7 + 0.18,
    vx: (Math.random() - 0.5) * theme.speed,
    vy: (Math.random() - 0.2) * theme.speed,
    color: theme.particle,
  }));
}

function animateSky() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    if (particle.x < -10) particle.x = width + 10;
    if (particle.x > width + 10) particle.x = -10;
    if (particle.y < -10) particle.y = height + 10;
    if (particle.y > height + 10) particle.y = -10;

    ctx.beginPath();
    ctx.globalAlpha = particle.alpha;
    ctx.fillStyle = particle.color;
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateSky);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    activeFilter = tab.dataset.filter;
    setPhoto(0);
  });
});

addButton.addEventListener("click", () => {
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  }
});

closeButton.addEventListener("click", () => dialog.close());

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const file = fileInput.files?.[0];
  if (!file) return;
  const theme = themeInput.value;
  const url = URL.createObjectURL(file);
  photos.unshift({
    title: titleInput.value.trim() || file.name.replace(/\.[^.]+$/, ""),
    theme,
    meta: `${theme[0].toUpperCase()}${theme.slice(1)} / local preview`,
    text: "Local browser preview. Add this file to assets and put its URL in app.js when you want it to persist.",
    gradient: photos.find((photo) => photo.theme === theme)?.gradient || photos[0].gradient,
    url,
  });
  activeFilter = "all";
  tabs.forEach((item) => item.classList.toggle("is-active", item.dataset.filter === "all"));
  addForm.reset();
  dialog.close();
  setPhoto(0);
});

document.querySelector(".prev").addEventListener("click", () => move(-1));
document.querySelector(".next").addEventListener("click", () => move(1));

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") move(-1);
  if (event.key === "ArrowRight") move(1);
});

let touchStartX = 0;
window.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.touches[0].clientX;
  },
  { passive: true },
);
window.addEventListener(
  "touchend",
  (event) => {
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 48) move(delta > 0 ? -1 : 1);
  },
  { passive: true },
);

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
setPhoto(0, true);
animateSky();
