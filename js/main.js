/**
 * main.js
 * Core site behaviour: sticky header, mobile nav, active nav state,
 * scroll-reveal animation, back-to-top button, FAQ accordion.
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileNav();
  initActiveNavState();
  initScrollReveal();
  initBackToTop();
  initAccordion();
  initHeroVideo();
  renderFooterYear();
});

/* ---------- Sticky header background on scroll ---------- */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const toggle = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

/* ---------- Mobile navigation drawer ---------- */
function initMobileNav() {
  const openBtn = document.getElementById("mobile-nav-open");
  const closeBtn = document.getElementById("mobile-nav-close");
  const nav = document.getElementById("mobile-nav");
  const backdrop = document.getElementById("mobile-nav-backdrop");
  if (!openBtn || !nav) return;

  const open = () => {
    nav.classList.add("is-open");
    backdrop?.classList.remove("hidden");
    openBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    nav.classList.remove("is-open");
    backdrop?.classList.add("hidden");
    openBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
}

/* ---------- Highlight active nav link based on current page ---------- */
function initActiveNavState() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/* ---------- Scroll reveal using IntersectionObserver ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal, .reveal-stagger");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- Back-to-top button ---------- */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("is-visible", window.scrollY > 480);
    },
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- FAQ accordion ---------- */
function initAccordion() {
  const items = document.querySelectorAll(".accordion-item");
  items.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    const panel = item.querySelector(".accordion-panel");
    if (!trigger || !panel) return;

    trigger.addEventListener("click", () => {
      const isOpen = item.getAttribute("data-open") === "true";

      // close all other items (single-open accordion)
      items.forEach((other) => {
        if (other !== item) {
          other.setAttribute("data-open", "false");
          other.querySelector(".accordion-trigger")?.setAttribute("aria-expanded", "false");
          const otherPanel = other.querySelector(".accordion-panel");
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      const next = !isOpen;
      item.setAttribute("data-open", String(next));
      trigger.setAttribute("aria-expanded", String(next));
      panel.style.maxHeight = next ? panel.scrollHeight + "px" : null;
    });
  });
}

/* ---------- Hero background video ---------- */
function initHeroVideo() {
  const video = document.getElementById("hero-bg-video");
  if (!video) return;

  // Respect reduced-motion preference: show the poster frame, don't autoplay.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.removeAttribute("autoplay");
    video.pause();
    return;
  }

  // Pause when scrolled out of view to save bandwidth/battery.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
  }
}

/* ---------- Footer year ---------- */
function renderFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
}
