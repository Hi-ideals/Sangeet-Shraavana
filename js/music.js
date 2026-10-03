/**
 * music.js
 * Background flute music for every page.
 *
 * Browsers block audio that starts on its own, so this works in layers:
 *   1. Try to play with sound as soon as the page loads.
 *   2. If blocked, start playing silently, then switch the sound on at the
 *      visitor's first tap, click or key press.
 *   3. If even that is blocked, start on the first tap, click or key press.
 *
 * Scrolling alone is not counted as a "user action" by browsers, so the first
 * tap/click is the earliest moment sound can legally start on most devices.
 *
 * The song keeps its place when the visitor moves between pages, and a visitor
 * who turns it off with the floating button stays off on every page.
 */
(function () {
  "use strict";

  const SRC = "assets/audio/krishna-flute.mp3";
  const PREF_KEY = "ss-music-pref"; // "off" when the visitor muted it (kept across visits)
  const TIME_KEY = "ss-music-time"; // playback position (kept for this tab only)
  const VOLUME = 0.45;
  const FADE_MS = 1800;

  const store = {
    get(area, key) {
      try { return window[area].getItem(key); } catch (e) { return null; }
    },
    set(area, key, value) {
      try { window[area].setItem(key, value); } catch (e) { /* storage unavailable */ }
    },
  };

  const audio = new Audio(SRC);
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0;

  // "playing" = audible, "armed" = waiting for a first tap, "off" = visitor turned it off
  let state = store.get("localStorage", PREF_KEY) === "off" ? "off" : "armed";
  let fadeTimer = null;
  let resumeAfterHidden = false;
  let button = null;

  /* ---------- Resume where the previous page left off ---------- */
  const savedTime = parseFloat(store.get("sessionStorage", TIME_KEY));
  if (!isNaN(savedTime) && savedTime > 0) {
    audio.addEventListener(
      "loadedmetadata",
      () => {
        if (audio.duration && savedTime < audio.duration) audio.currentTime = savedTime;
      },
      { once: true }
    );
  }

  const saveTime = () => store.set("sessionStorage", TIME_KEY, String(audio.currentTime || 0));
  audio.addEventListener("timeupdate", () => {
    if (Math.floor(audio.currentTime) % 2 === 0) saveTime();
  });
  window.addEventListener("pagehide", saveTime);

  /* ---------- Volume fade ---------- */
  function fadeTo(target, ms, done) {
    clearInterval(fadeTimer);
    const from = audio.volume;
    const start = performance.now();
    fadeTimer = setInterval(() => {
      const t = Math.min(1, (performance.now() - start) / ms);
      audio.volume = from + (target - from) * t;
      if (t >= 1) {
        clearInterval(fadeTimer);
        if (done) done();
      }
    }, 40);
  }

  /* ---------- Button state ---------- */
  function render() {
    if (!button) return;
    const on = state === "playing";
    button.classList.toggle("is-playing", on);
    button.classList.toggle("is-waiting", state === "armed");
    button.setAttribute("aria-pressed", String(on));
    const label = on ? "Pause background music" : "Play background music";
    button.setAttribute("aria-label", label);
    button.title = label;
  }

  function setState(next) {
    state = next;
    render();
  }

  /* ---------- Start / stop ---------- */
  function makeAudible() {
    audio.muted = false;
    setState("playing");
    fadeTo(VOLUME, FADE_MS);
  }

  // Try to start with sound. Resolves true if the browser allowed it.
  function playWithSound() {
    audio.muted = false;
    return audio.play().then(
      () => { makeAudible(); return true; },
      () => false
    );
  }

  // Fallback: silent playback, so the song is already running at the first tap.
  function playSilently() {
    audio.muted = true;
    audio.volume = VOLUME;
    return audio.play().catch(() => {});
  }

  function pause() {
    setState("off");
    store.set("localStorage", PREF_KEY, "off");
    fadeTo(0, 400, () => audio.pause());
  }

  function play() {
    store.set("localStorage", PREF_KEY, "on");
    playWithSound().then((ok) => {
      if (!ok) setState("armed");
    });
  }

  /* ---------- First visitor action unlocks the sound ---------- */
  const UNLOCK_EVENTS = ["pointerdown", "pointerup", "touchend", "click", "keydown"];
  let unlocking = false;

  function onFirstAction(e) {
    if (state !== "armed" || unlocking) return;
    if (e.target && e.target.closest && e.target.closest("#music-toggle")) return;
    unlocking = true;

    const finish = (ok) => {
      unlocking = false;
      if (ok) UNLOCK_EVENTS.forEach((n) => document.removeEventListener(n, onFirstAction, true));
    };

    if (!audio.paused) {
      // Already running silently: just bring the sound up.
      audio.muted = false;
      audio.volume = 0;
      makeAudible();
      finish(true);
    } else {
      playWithSound().then(finish);
    }
  }

  UNLOCK_EVENTS.forEach((n) => document.addEventListener(n, onFirstAction, true));

  /* ---------- Pause while the tab is in the background ---------- */
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (state === "playing" && !audio.paused) {
        resumeAfterHidden = true;
        audio.pause();
      }
    } else if (resumeAfterHidden) {
      resumeAfterHidden = false;
      audio.play().catch(() => setState("armed"));
    }
  });

  /* ---------- Floating button ---------- */
  function buildButton() {
    button = document.createElement("button");
    button.id = "music-toggle";
    button.type = "button";
    button.className = "music-toggle";
    button.innerHTML =
      '<span class="music-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';
    button.addEventListener("click", () => {
      if (state === "playing") pause();
      else play();
    });
    document.body.appendChild(button);
    render();
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildButton();
    if (state === "off") return;
    // Autoplay attempt. If blocked, keep it running silently until the first tap.
    playWithSound().then((ok) => {
      if (!ok) playSilently();
    });
  });
})();
