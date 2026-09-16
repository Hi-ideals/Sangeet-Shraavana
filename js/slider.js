/**
 * slider.js
 * Lightweight vanilla JS hero slider.
 * Auto-play, prev/next, indicators, swipe, keyboard, pause on hover/hidden.
 */

class HeroSlider {
  constructor(root, { interval = 6000 } = {}) {
    this.root = root;
    this.slides = Array.from(root.querySelectorAll(".hero-slide"));
    this.indicators = Array.from(root.querySelectorAll(".hero-indicator"));
    this.prevBtn = root.querySelector("[data-hero-prev]");
    this.nextBtn = root.querySelector("[data-hero-next]");
    this.interval = interval;
    this.index = 0;
    this.timer = null;

    if (!this.slides.length) return;
    this.bindEvents();
    this.play();
  }

  goTo(i) {
    this.slides[this.index].classList.remove("is-active");
    this.indicators[this.index]?.classList.remove("is-active");
    this.index = (i + this.slides.length) % this.slides.length;
    this.slides[this.index].classList.add("is-active");
    this.indicators[this.index]?.classList.add("is-active");
  }

  next() {
    this.goTo(this.index + 1);
  }

  prev() {
    this.goTo(this.index - 1);
  }

  play() {
    this.stop();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    this.timer = setInterval(() => this.next(), this.interval);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  bindEvents() {
    this.nextBtn?.addEventListener("click", () => {
      this.next();
      this.play();
    });
    this.prevBtn?.addEventListener("click", () => {
      this.prev();
      this.play();
    });

    this.indicators.forEach((ind, i) => {
      ind.addEventListener("click", () => {
        this.goTo(i);
        this.play();
      });
    });

    this.root.addEventListener("mouseenter", () => this.stop());
    this.root.addEventListener("mouseleave", () => this.play());

    // pause when tab not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) this.stop();
      else this.play();
    });

    // pause when scrolled out of view
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) this.play();
            else this.stop();
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(this.root);
    }

    // keyboard support
    this.root.setAttribute("tabindex", "0");
    this.root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        this.next();
        this.play();
      } else if (e.key === "ArrowLeft") {
        this.prev();
        this.play();
      }
    });

    // touch/swipe support
    let startX = 0;
    this.root.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );
    this.root.addEventListener(
      "touchend",
      (e) => {
        const endX = e.changedTouches[0].clientX;
        const delta = endX - startX;
        if (Math.abs(delta) > 40) {
          delta > 0 ? this.prev() : this.next();
          this.play();
        }
      },
      { passive: true }
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const heroEl = document.getElementById("hero-slider");
  if (heroEl) new HeroSlider(heroEl);
});
