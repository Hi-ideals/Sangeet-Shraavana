/**
 * decor.js
 * Adds two ambient decorations to every section on every page:
 *  1. A bulk field of subtle, continuously rising music-note icons.
 *  2. A static instrument illustration tucked into the bottom-right
 *     corner of each section.
 * Both are purely decorative and non-interactive. The rising notes
 * are disabled for users who prefer reduced motion; the static
 * corner image is unaffected since it doesn't animate.
 */

const DECOR_ICONS = ["music", "music-2", "music-3", "music-4"];
const NOTES_PER_SECTION = 8;
const CORNER_IMAGE = "assets/images/decor/instrument.png";

function addCornerInstrument(section) {
  if (section.querySelector(".decor-corner")) return;
  const corner = document.createElement("div");
  corner.className = "decor-corner";
  corner.setAttribute("aria-hidden", "true");
  corner.innerHTML = `<img src="${CORNER_IMAGE}" alt="" loading="lazy" />`;
  section.appendChild(corner);
}

function initFloatingNotes() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sections = document.querySelectorAll("main section");

  sections.forEach((section, sectionIndex) => {
    section.classList.add("decor-host");

    if (!reduceMotion && !section.querySelector(".decor-notes")) {
      const wrap = document.createElement("div");
      wrap.className = "decor-notes";
      wrap.setAttribute("aria-hidden", "true");

      for (let i = 0; i < NOTES_PER_SECTION; i++) {
        const iconName = DECOR_ICONS[(sectionIndex + i) % DECOR_ICONS.length];
        const el = document.createElement("i");
        el.setAttribute("data-lucide", iconName);
        el.className = "decor-note";

        const left = 2 + Math.random() * 92; // % across the section width
        const size = 16 + Math.random() * 30; // px
        const duration = 14 + Math.random() * 20; // seconds to rise fully
        const delay = -Math.random() * duration; // negative = staggered, already mid-flight
        const sway = 10 + Math.random() * 26; // px of horizontal wobble

        el.style.left = `${left}%`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.animationDuration = `${duration}s`;
        el.style.animationDelay = `${delay}s`;
        el.style.setProperty("--decor-sway", `${sway}px`);

        wrap.appendChild(el);
      }

      section.prepend(wrap);
    }

    addCornerInstrument(section);
  });

  if (window.lucide) window.lucide.createIcons();
}

document.addEventListener("DOMContentLoaded", initFloatingNotes);
