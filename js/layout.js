/**
 * layout.js
 * Renders the reusable Header, Mobile Nav drawer, Footer and Back-to-top
 * button into placeholder elements on every page, driven by content.js.
 * Keeps navigation/footer content in one place instead of duplicated
 * across every HTML file.
 */

function renderHeader() {
  const el = document.getElementById("site-header");
  if (!el || typeof SITE_CONTENT === "undefined") return;

  const nav = SITE_CONTENT.navigation;

  el.innerHTML = `
    <header class="site-header fixed top-0 inset-x-0 z-50 bg-ivory/90">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-20">
        <a href="index.html" class="flex items-center gap-3">
          <img src="assets/logos/logo.png" alt="Sangeet Shraavana" class="h-12 sm:h-14 w-auto object-contain" />
        </a>

        <nav aria-label="Primary" class="hidden lg:flex items-center gap-8">
          <ul class="flex items-center gap-8 font-medium text-sm">
            ${nav
              .filter((item) => item.label !== "Contact")
              .map((item) => `<li><a data-nav-link href="${item.href}" class="nav-link">${item.label}</a></li>`)
              .join("")}
          </ul>
          <a href="contact.html" class="gradient-bg text-ivory text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
            Contact Us
          </a>
        </nav>

        <button id="mobile-nav-open" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav" class="lg:hidden p-2 -mr-2">
          <i data-lucide="menu" class="w-7 h-7"></i>
        </button>
      </div>
    </header>

    <div id="mobile-nav-backdrop" class="hidden fixed inset-0 bg-ink/60 z-50"></div>
    <aside id="mobile-nav" class="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-ivory z-50 shadow-2xl p-6 flex flex-col">
      <div class="flex items-center justify-between mb-8">
        <span class="font-display text-xl font-semibold">Menu</span>
        <button id="mobile-nav-close" type="button" aria-label="Close menu" class="p-2">
          <i data-lucide="x" class="w-6 h-6"></i>
        </button>
      </div>
      <nav aria-label="Mobile primary">
        <ul class="flex flex-col gap-1 text-lg font-display">
          ${nav.map((item) => `<li><a data-nav-link href="${item.href}" class="block py-3 border-b border-ink/10">${item.label}</a></li>`).join("")}
        </ul>
      </nav>
      <a href="contact.html" class="gradient-bg text-ivory text-center font-medium px-5 py-3 rounded-full mt-6">Contact Us</a>
    </aside>
  `;
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el || typeof SITE_CONTENT === "undefined") return;

  const { academy } = SITE_CONTENT;

  el.innerHTML = `
    <footer class="bg-ink text-ivory pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-5 sm:px-8">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <img src="assets/logos/logo-light.png" alt="Sangeet Shraavana" class="h-14 w-auto object-contain mb-3" />
            <p class="text-ivory/60 text-sm max-w-xs">${academy.tagline} — classical music and dance training in ${academy.address}.</p>
            <div class="flex items-center gap-3 mt-5">
              ${SITE_CONTENT.social
                .map(
                  (s) =>
                    `<a href="${s.href}" aria-label="${s.platform}" class="w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center hover:border-amber transition-colors"><i data-lucide="${s.icon}" class="w-4 h-4"></i></a>`
                )
                .join("")}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <p class="font-medium mb-4 text-ivory/90">Explore</p>
            <ul class="space-y-3 text-sm text-ivory/60">
              <li><a href="about.html" class="hover:text-amber transition-colors">About</a></li>
              <li><a href="faculty.html" class="hover:text-amber transition-colors">Faculty</a></li>
              <li><a href="gallery.html" class="hover:text-amber transition-colors">Gallery</a></li>
              <li><a href="events.html" class="hover:text-amber transition-colors">Events</a></li>
            </ul>
          </nav>

          <nav aria-label="Footer secondary navigation">
            <p class="font-medium mb-4 text-ivory/90">More</p>
            <ul class="space-y-3 text-sm text-ivory/60">
              <li><a href="registration.html" class="hover:text-amber transition-colors">Stay Connected</a></li>
              <li><a href="contact.html" class="hover:text-amber transition-colors">Contact</a></li>
            </ul>
          </nav>

          <div>
            <p class="font-medium mb-4 text-ivory/90">Contact</p>
            <ul class="space-y-3 text-sm text-ivory/60">
              <li>${academy.phone}</li>
              <li>${academy.email}</li>
              <li>${academy.address}</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-ivory/10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-ivory/50">
          <p>&copy; <span id="footer-year"></span> ${academy.name}. All rights reserved.</p>
          <p>${academy.address}</p>
        </div>
      </div>
    </footer>

    <button id="back-to-top" aria-label="Back to top" class="fixed bottom-6 right-6 w-12 h-12 rounded-full gradient-bg text-ivory flex items-center justify-center shadow-lg z-40">
      <i data-lucide="arrow-up" class="w-5 h-5"></i>
    </button>
  `;
}

function markActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  markActiveNav();
  if (window.lucide) window.lucide.createIcons();
  document.getElementById("footer-year") && (document.getElementById("footer-year").textContent = new Date().getFullYear());
  // re-run behaviours that depend on the now-injected header/footer markup
  document.dispatchEvent(new Event("layout:ready"));
});
