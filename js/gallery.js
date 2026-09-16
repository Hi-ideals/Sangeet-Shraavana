/**
 * gallery.js
 * Renders gallery grid from content.js and powers the lightbox:
 * category filter, prev/next, close, keyboard nav, touch swipe, counter.
 */

let galleryItems = [];
let galleryIndex = 0;

function galleryItemTemplate(item, i) {
  return `
    <button
      type="button"
      class="gallery-item block w-full text-left"
      data-index="${i}"
      data-category="${item.category}"
      aria-label="Open image: ${item.caption}"
    >
      <img
        src="${item.image}"
        alt="${item.caption}"
        width="300" height="300"
        loading="lazy"
        class="w-full h-56 object-cover"
        onerror="this.src='https://placehold.co/300x300/0a0f2b/d9a441?text=Gallery'"
      />
    </button>
  `;
}

function renderGallery(targetId, items) {
  const el = document.getElementById(targetId);
  if (!el) return;
  galleryItems = items;
  el.innerHTML = items.map(galleryItemTemplate).join("");

  el.querySelectorAll(".gallery-item").forEach((btn) => {
    btn.addEventListener("click", () => openLightbox(Number(btn.dataset.index)));
  });
}

function initGalleryFilter() {
  const buttons = document.querySelectorAll("[data-gallery-filter]");
  const grid = document.getElementById("gallery-grid");
  if (!buttons.length || !grid) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const category = btn.getAttribute("data-gallery-filter");

      grid.querySelectorAll(".gallery-item").forEach((item) => {
        const show = category === "all" || item.dataset.category === category;
        item.parentElement.classList.toggle("hidden", !show);
      });
    });
  });
}

/* ---------- Lightbox ---------- */

function openLightbox(index) {
  galleryIndex = index;
  const overlay = document.getElementById("lightbox");
  if (!overlay) return;
  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  updateLightboxImage();
  document.getElementById("lightbox-close")?.focus();
}

function closeLightbox() {
  const overlay = document.getElementById("lightbox");
  if (!overlay) return;
  overlay.classList.add("hidden");
  document.body.style.overflow = "";
}

function updateLightboxImage() {
  const item = galleryItems[galleryIndex];
  if (!item) return;
  const img = document.getElementById("lightbox-image");
  const caption = document.getElementById("lightbox-caption");
  const counter = document.getElementById("lightbox-counter");

  if (img) {
    img.src = item.image;
    img.alt = item.caption;
    img.onerror = () => {
      img.src = "https://placehold.co/900x600/0a0f2b/d9a441?text=Gallery";
    };
  }
  if (caption) caption.textContent = item.caption;
  if (counter) counter.textContent = `${galleryIndex + 1} / ${galleryItems.length}`;
}

function lightboxNext() {
  galleryIndex = (galleryIndex + 1) % galleryItems.length;
  updateLightboxImage();
}

function lightboxPrev() {
  galleryIndex = (galleryIndex - 1 + galleryItems.length) % galleryItems.length;
  updateLightboxImage();
}

function initLightboxControls() {
  document.getElementById("lightbox-close")?.addEventListener("click", closeLightbox);
  document.getElementById("lightbox-next")?.addEventListener("click", lightboxNext);
  document.getElementById("lightbox-prev")?.addEventListener("click", lightboxPrev);
  document.getElementById("lightbox")?.addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    const overlay = document.getElementById("lightbox");
    if (!overlay || overlay.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") lightboxNext();
    if (e.key === "ArrowLeft") lightboxPrev();
  });

  // touch swipe
  let startX = 0;
  const overlay = document.getElementById("lightbox");
  overlay?.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
  overlay?.addEventListener(
    "touchend",
    (e) => {
      const delta = e.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 40) (delta > 0 ? lightboxPrev() : lightboxNext());
    },
    { passive: true }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SITE_CONTENT === "undefined") return;

  const previewEl = document.getElementById("gallery-preview-grid");
  if (previewEl) renderGallery("gallery-preview-grid", SITE_CONTENT.gallery.slice(0, 8));

  const fullEl = document.getElementById("gallery-grid");
  if (fullEl) {
    renderGallery("gallery-grid", SITE_CONTENT.gallery);
    initGalleryFilter();
  }

  initLightboxControls();
});
