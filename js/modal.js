/**
 * modal.js
 * A single reusable "detail modal" used to show full blog posts and
 * full event information when a card is clicked. Injects its own
 * markup into the page so no HTML boilerplate is needed per-page.
 */

function ensureDetailModal() {
  if (document.getElementById("detail-modal")) return;

  const modal = document.createElement("div");
  modal.id = "detail-modal";
  modal.className = "lightbox-overlay hidden fixed inset-0 z-[100] flex items-center justify-center p-4";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "detail-modal-title");

  modal.innerHTML = `
    <div class="bg-ivory rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative reveal is-visible">
      <button id="detail-modal-close" aria-label="Close" class="absolute top-4 right-4 w-10 h-10 rounded-full bg-ink/80 text-ivory flex items-center justify-center hover:bg-ink transition-colors z-10">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
      <img id="detail-modal-image" src="" alt="" width="800" height="320" class="w-full h-64 object-cover rounded-t-2xl" />
      <div class="p-6 sm:p-9">
        <p id="detail-modal-meta" class="text-sm text-wine font-medium mb-2"></p>
        <h2 id="detail-modal-title" class="font-display text-3xl mb-2"></h2>
        <p id="detail-modal-submeta" class="text-sm text-muted mb-6"></p>
        <div id="detail-modal-body" class="text-ink/80 leading-relaxed space-y-4"></div>
        <div id="detail-modal-footer" class="mt-8"></div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("detail-modal-close").addEventListener("click", closeDetailModal);
  modal.addEventListener("click", (e) => {
    if (e.target.id === "detail-modal") closeDetailModal();
  });
  document.addEventListener("keydown", (e) => {
    const m = document.getElementById("detail-modal");
    if (m && !m.classList.contains("hidden") && e.key === "Escape") closeDetailModal();
  });

  if (window.lucide) window.lucide.createIcons();
}

/**
 * @param {Object} data
 * @param {string} data.title
 * @param {string} [data.meta] - small label above title, e.g. category or date
 * @param {string} [data.submeta] - secondary line under title, e.g. time/location
 * @param {string} data.image
 * @param {string[]} data.paragraphs - body paragraphs
 * @param {string} [data.footerHtml] - optional HTML for a footer action (e.g. a CTA link)
 */
function openDetailModal(data) {
  ensureDetailModal();
  const modal = document.getElementById("detail-modal");

  document.getElementById("detail-modal-title").textContent = data.title || "";
  document.getElementById("detail-modal-meta").textContent = data.meta || "";
  document.getElementById("detail-modal-submeta").textContent = data.submeta || "";
  document.getElementById("detail-modal-body").innerHTML = (data.paragraphs || [])
    .map((p) => `<p>${p}</p>`)
    .join("");
  document.getElementById("detail-modal-footer").innerHTML = data.footerHtml || "";

  const img = document.getElementById("detail-modal-image");
  img.src = data.image || "";
  img.alt = data.title || "";
  img.style.display = "block";
  img.onerror = () => {
    img.style.display = "none";
  };

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  document.getElementById("detail-modal-close").focus();
  if (window.lucide) window.lucide.createIcons();
}

function closeDetailModal() {
  const modal = document.getElementById("detail-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", ensureDetailModal);
