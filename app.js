const photos = [
  {
    title: "Moon Beside Brick",
    theme: "moon",
    meta: "Moon / city edge",
    text: "A pale moon held between quiet blue air, red brick, and thin black wires.",
    gradient:
      "linear-gradient(160deg, #162233 0%, #527084 48%, #9b704f 100%)",
    url: "./assets/moon-city-full.jpg",
    frame: "3 / 4",
    position: "52% 50%",
  },
  {
    title: "Angel Under Stars",
    theme: "stars",
    meta: "Stars / silhouette",
    text: "A dark monument against a scattered night sky, with a last warm line near the horizon.",
    gradient:
      "linear-gradient(160deg, #05070e 0%, #202837 58%, #c98c3e 100%)",
    url: "./assets/star-silhouette.jpg",
    frame: "3 / 4",
    position: "50% 46%",
  },
  {
    title: "Half Moon Over Roofs",
    theme: "moon",
    meta: "Moon / blue evening",
    text: "A small half moon floats over sleeping rooftops in a deep evening sky.",
    gradient:
      "linear-gradient(160deg, #0b1221 0%, #243349 62%, #67412d 100%)",
    url: "./assets/moon-over-rooftops.jpg",
    frame: "3 / 4",
    position: "50% 52%",
  },
  {
    title: "Golden Cloud Bank",
    theme: "clouds",
    meta: "Clouds / sunset light",
    text: "Heavy clouds catch warm low light while the upper sky stays quiet and blue.",
    gradient:
      "linear-gradient(150deg, #536e82 0%, #8ca6ad 42%, #e9a45d 86%)",
    url: "./assets/golden-clouds.jpg",
    frame: "16 / 7",
    position: "50% 50%",
  },
  {
    title: "Violet Sunset",
    theme: "sunset",
    meta: "Sunset / garden line",
    text: "A purple evening sky closing behind dark trees and a thin glowing horizon.",
    gradient:
      "linear-gradient(160deg, #3e355d 0%, #b66da9 45%, #f0a66f 74%, #1b1519 100%)",
    url: "./assets/violet-sunset.jpg",
    frame: "16 / 7",
    position: "50% 48%",
  },
  {
    title: "Deep Star Field",
    theme: "stars",
    meta: "Stars / meteor line",
    text: "A vertical slice of dense stars, cool green night air, and a bright passing trace.",
    gradient:
      "linear-gradient(160deg, #02060a 0%, #0b2d33 60%, #244944 100%)",
    url: "./assets/deep-star-field.jpg",
    frame: "9 / 16",
    position: "50% 50%",
  },
  {
    title: "Vineyard Stars",
    theme: "stars",
    meta: "Stars / green night",
    text: "A vivid night sky over leaves lit from below, bright and almost unreal.",
    gradient:
      "linear-gradient(160deg, #010407 0%, #0a3a2e 57%, #6c8d25 100%)",
    url: "./assets/vineyard-stars.jpg",
    frame: "3 / 4",
    position: "50% 47%",
  },
  {
    title: "Open Road Clouds",
    theme: "clouds",
    meta: "Clouds / road horizon",
    text: "A low rural road under wide, bright clouds and a calm blue sky.",
    gradient:
      "linear-gradient(150deg, #64a4e6 0%, #e7eef7 45%, #d7d7bf 70%, #2f3e2b 100%)",
    url: "./assets/open-road-clouds.jpg",
    frame: "16 / 8",
    position: "50% 50%",
  },
  {
    title: "Yellow Field",
    theme: "sunrise",
    meta: "Daylight / field",
    text: "A clear blue sky and a wide yellow field, bright enough to reset the whole scene.",
    gradient:
      "linear-gradient(160deg, #126fd2 0%, #4fa1f1 42%, #f1d915 75%, #2d5c2f 100%)",
    url: "./assets/yellow-field.jpg",
    frame: "16 / 7",
    position: "50% 50%",
  },
  {
    title: "Andriivska Light",
    theme: "city",
    meta: "City / winter daylight",
    text: "A crisp city landmark in winter sun, all turquoise, gold, and blue.",
    gradient:
      "linear-gradient(160deg, #0d65c5 0%, #38a0e8 44%, #8fd7dc 72%, #f3bf54 100%)",
    url: "./assets/andriivska-church.jpg",
    frame: "3 / 4",
    position: "50% 43%",
  },
  {
    title: "Golden Dome",
    theme: "city",
    meta: "City / blue winter",
    text: "A gold dome cutting into a clean blue winter sky, bright and architectural.",
    gradient:
      "linear-gradient(160deg, #073b82 0%, #1376d6 45%, #f3d36a 80%, #eef3f7 100%)",
    url: "./assets/mykhailivska-dome.jpg",
    frame: "3 / 4",
    position: "50% 42%",
  },
  {
    title: "River Watch",
    theme: "city",
    meta: "City / winter river",
    text: "A quiet statue looks over the frozen river toward the pale city skyline.",
    gradient:
      "linear-gradient(160deg, #d7edf7 0%, #9fb8c5 42%, #e9e1d4 74%, #52645c 100%)",
    url: "./assets/dnipro-statue-view.jpg",
    frame: "3 / 4",
    position: "50% 48%",
  },
  {
    title: "Blue Arch",
    theme: "city",
    meta: "City / monument sky",
    text: "A bright arc of stone and shadow across a deep blue Kyiv sky.",
    gradient:
      "linear-gradient(160deg, #062b67 0%, #0d65c5 62%, #f1e7dd 92%)",
    url: "./assets/friendship-arch-blue.jpg",
    frame: "3 / 4",
    position: "50% 42%",
  },
  {
    title: "Winter Bridge",
    theme: "sunrise",
    meta: "Daylight / winter path",
    text: "Long morning shadows stretch along a snowy bridge under open blue air.",
    gradient:
      "linear-gradient(160deg, #62b3ec 0%, #cfefff 46%, #ded8ca 72%, #9b5a3d 100%)",
    url: "./assets/winter-bridge.jpg",
    frame: "3 / 4",
    position: "50% 52%",
  },
  {
    title: "Red Moon",
    theme: "moon",
    meta: "Moon / eclipse dark",
    text: "A red moon hangs alone in deep black, quiet and almost mineral.",
    gradient:
      "radial-gradient(circle at 48% 45%, #a85835 0 12%, transparent 24%), linear-gradient(160deg, #020205 0%, #0b0708 100%)",
    url: "./assets/red-moon.jpg",
    frame: "9 / 16",
    position: "50% 40%",
  },
  {
    title: "Clear Star Sky",
    theme: "stars",
    meta: "Stars / clean night",
    text: "A dense field of stars on a cool, transparent night sky.",
    gradient:
      "linear-gradient(160deg, #020609 0%, #102432 54%, #23384b 100%)",
    url: "./assets/clear-star-sky.jpg",
    frame: "3 / 4",
    position: "50% 48%",
  },
  {
    title: "Soft City Sunset",
    theme: "sunset",
    meta: "Sunset / city haze",
    text: "Warm orange light settles behind dark city blocks and thin power lines.",
    gradient:
      "linear-gradient(160deg, #6b7184 0%, #f4ae6f 48%, #e35b3d 74%, #17191f 100%)",
    url: "./assets/soft-city-sunset.jpg",
    frame: "16 / 7",
    position: "50% 50%",
  },
  {
    title: "Evening Crescent",
    theme: "moon",
    meta: "Moon / dusk gradient",
    text: "A small golden crescent floats in a quiet gray and rose evening.",
    gradient:
      "linear-gradient(160deg, #18212e 0%, #4a4d56 58%, #8d6356 100%)",
    url: "./assets/crescent-evening.jpg",
    frame: "9 / 16",
    position: "50% 48%",
  },
  {
    title: "Red Skyline",
    theme: "sunset",
    meta: "Sunset / red clouds",
    text: "A strong red evening sky over black building silhouettes and diagonal wires.",
    gradient:
      "linear-gradient(160deg, #2e2336 0%, #a94158 40%, #e24b2d 68%, #0b0c11 100%)",
    url: "./assets/red-city-sunset.jpg",
    frame: "16 / 7",
    position: "50% 50%",
  },
  {
    title: "Evening Road",
    theme: "city",
    meta: "City / dusk road",
    text: "A city road carries the last violet light, headlights, and overhead wires.",
    gradient:
      "linear-gradient(160deg, #443757 0%, #b47797 48%, #f0a55e 72%, #171722 100%)",
    url: "./assets/evening-road.jpg",
    frame: "3 / 4",
    position: "50% 58%",
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
const photoFrame = document.querySelector(".photo-frame");
const photoImage = document.querySelector(".photo-image");
const caption = {
  line: document.querySelector(".photo-caption"),
};
const filmstrip = document.querySelector(".filmstrip");
const filmstripPrev = document.querySelector(".filmstrip-prev");
const filmstripNext = document.querySelector(".filmstrip-next");
const tabs = [...document.querySelectorAll(".theme-tab")];
const canvas = document.querySelector(".sky-canvas");
const ctx = canvas.getContext("2d");
const timerCursor = document.querySelector(".timer-cursor");
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
let currentPhoto = photos[0];
let autoplayStartedAt = performance.now();
let pauseStartedAt = 0;
let isPointerHolding = false;
let isSpaceHolding = false;
const AUTOPLAY_DELAY = 7000;

function isPaused() {
  return isPointerHolding || isSpaceHolding || dialog.open;
}

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
  activeIndex = Math.max(0, Math.min(index, list.length - 1));
  const photo = list[activeIndex];
  currentPhoto = photo;
  autoplayStartedAt = performance.now();

  stage.classList.add("is-changing");
  window.setTimeout(
    () => {
      applyTheme(photo.theme);
      photoImage.style.setProperty("--photo-gradient", photo.gradient);
      photoImage.style.setProperty("--photo-position", photo.position || "center");
      photoFrame.style.setProperty("--photo-gradient", photo.gradient);
      photoFrame.style.setProperty("--photo-position", photo.position || "center");
      photoFrame.style.setProperty("--frame-ratio", photo.frame || "4 / 5");
      photoImage.classList.toggle("has-url", Boolean(photo.url));
      if (photo.url) {
        photoImage.style.setProperty("--photo-url", `url("${photo.url}")`);
      }
      photoImage.setAttribute("aria-label", `${photo.title}, ${photo.meta}`);
      caption.line.textContent = `${photo.title} - ${photo.meta} / ${photo.date || "без дати"}`;
      renderFilmstrip();
      updateNavigationState();
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
    button.style.setProperty("--photo-position", photo.position || "center");
    if (photo.url) {
      button.classList.add("has-url");
      button.style.setProperty("--photo-url", `url("${photo.url}")`);
    }
    button.addEventListener("click", () => setPhoto(index));
    filmstrip.appendChild(button);
  });
  centerActiveThumb();
}

function move(direction) {
  const list = filteredPhotos();
  const nextIndex = activeIndex + direction;
  if (nextIndex < 0 || nextIndex >= list.length) return;
  setPhoto(nextIndex);
}

function scrollFilmstrip(direction) {
  filmstrip.scrollBy({
    left: direction * Math.max(220, filmstrip.clientWidth * 0.72),
    behavior: "smooth",
  });
}

function centerActiveThumb() {
  const activeThumb = filmstrip.querySelector(".thumb.is-active");
  if (!activeThumb) return;
  const target =
    activeThumb.offsetLeft - filmstrip.clientWidth / 2 + activeThumb.clientWidth / 2;
  filmstrip.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
}

function updateNavigationState() {
  const list = filteredPhotos();
  document.querySelector(".prev").classList.toggle("is-hidden", activeIndex <= 0);
  document.querySelector(".next").classList.toggle("is-hidden", activeIndex >= list.length - 1);

  const maxScrollLeft = Math.max(0, filmstrip.scrollWidth - filmstrip.clientWidth - 2);
  filmstripPrev.classList.toggle("is-hidden", filmstrip.scrollLeft <= 2);
  filmstripNext.classList.toggle("is-hidden", filmstrip.scrollLeft >= maxScrollLeft);
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

function animateAutoplay(now) {
  if (isPaused()) {
    if (!pauseStartedAt) pauseStartedAt = now;
    timerCursor.classList.add("is-paused");
  } else {
    if (pauseStartedAt) {
      autoplayStartedAt += now - pauseStartedAt;
      pauseStartedAt = 0;
    }
    timerCursor.classList.remove("is-paused");
    const elapsed = now - autoplayStartedAt;
    const progress = Math.min(1, elapsed / AUTOPLAY_DELAY);
    timerCursor.style.setProperty("--progress", progress.toFixed(3));
    if (elapsed >= AUTOPLAY_DELAY) {
      if (activeIndex < filteredPhotos().length - 1) {
        move(1);
      } else {
        autoplayStartedAt = now;
      }
    }
  }
  requestAnimationFrame(animateAutoplay);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    activeFilter = tab.dataset.filter;
    setPhoto(0);
    document.querySelector("#gallery").scrollIntoView({ behavior: "smooth" });
  });
});

addButton.addEventListener("click", () => {
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  }
});

closeButton.addEventListener("click", () => dialog.close());
filmstripPrev.addEventListener("click", () => scrollFilmstrip(-1));
filmstripNext.addEventListener("click", () => scrollFilmstrip(1));
filmstrip.addEventListener("scroll", updateNavigationState, { passive: true });

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
  if (event.code === "Space" && !event.repeat) {
    event.preventDefault();
    isSpaceHolding = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    isSpaceHolding = false;
  }
});

photoFrame.addEventListener("pointerdown", (event) => {
  if (event.button !== 0 && event.pointerType === "mouse") return;
  isPointerHolding = true;
});

photoFrame.addEventListener("pointerup", () => {
  isPointerHolding = false;
});

photoFrame.addEventListener("pointercancel", () => {
  isPointerHolding = false;
});

photoFrame.addEventListener("pointerenter", (event) => {
  if (event.pointerType === "touch") return;
  photoFrame.classList.add("is-timer-active");
  timerCursor.classList.add("is-visible");
});

photoFrame.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch") return;
  timerCursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
});

photoFrame.addEventListener("pointerleave", () => {
  isPointerHolding = false;
  photoFrame.classList.remove("is-timer-active");
  timerCursor.classList.remove("is-visible", "is-paused");
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
window.addEventListener("resize", updateNavigationState);

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
});

resizeCanvas();
setPhoto(0, true);
animateSky();
requestAnimationFrame(animateAutoplay);
