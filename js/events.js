/**
 * events.js
 * Renders upcoming event cards from content.js. Clicking an event
 * opens full details (time, location, description) in the shared
 * detail modal (see modal.js).
 */

function formatEventDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function eventCardTemplate(event, index) {
  const d = new Date(event.date);
  const day = d.toLocaleDateString("en-IN", { day: "numeric" });
  const month = d.toLocaleDateString("en-IN", { month: "short" });

  return `
    <article
      class="flex gap-5 items-start cursor-pointer group"
      data-event-index="${index}"
      role="button"
      tabindex="0"
      aria-label="View details: ${event.title}"
    >
      <div class="shrink-0 w-16 text-center tilt-3d">
        <div class="gradient-bg text-[var(--color-ivory)] rounded-lg py-2">
          <div class="font-display text-2xl leading-none">${day}</div>
          <div class="text-xs uppercase tracking-wide">${month}</div>
        </div>
      </div>
      <div>
        <h3 class="font-display text-2xl mb-1 group-hover:text-[var(--color-wine)] transition-colors">${event.title}</h3>
        <p class="text-sm text-[var(--color-muted)] mb-1">${formatEventDate(event.date)}${event.time ? " · " + event.time : ""}</p>
        <p class="text-sm text-ink/80 max-w-md mb-2">${event.description}</p>
        <span class="text-sm font-medium text-[var(--color-wine)]">View details</span>
      </div>
    </article>
  `;
}

function renderEvents(targetId, events) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = events.map((event, i) => eventCardTemplate(event, i)).join("");

  el.querySelectorAll("[data-event-index]").forEach((card) => {
    const open = () => openEventModal(events[Number(card.dataset.eventIndex)]);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

/* ---------- Homepage grid variant (blog-card style, distinct from the flat list above) ---------- */

function eventBlogCardTemplate(event, index) {
  const d = new Date(event.date);
  const day = d.toLocaleDateString("en-IN", { day: "numeric" });
  const month = d.toLocaleDateString("en-IN", { month: "short" });

  return `
    <article class="cursor-pointer border border-ivory/15 hover:border-amber/50 transition-colors rounded-2xl p-5 tilt-3d" data-event-index="${index}" role="button" tabindex="0" aria-label="View details: ${event.title}">
      <div class="overflow-hidden mb-4 rounded-xl relative">
        <img
          src="${event.image}"
          alt="${event.title}"
          width="400" height="260"
          loading="lazy"
          class="w-full h-56 object-cover"
          onerror="this.src='https://placehold.co/400x260/0a0f2b/d9a441?text=Event'"
        />
        <div class="absolute top-3 left-3 gradient-bg text-ivory rounded-lg px-3 py-1.5 text-center leading-none shadow-md">
          <div class="font-display text-lg">${day}</div>
          <div class="text-[9px] uppercase tracking-wide">${month}</div>
        </div>
      </div>
      <p class="text-xs text-ivory/55 mb-2">${formatEventDate(event.date)}${event.time ? " · " + event.time : ""}</p>
      <h3 class="font-display text-2xl mb-2 text-ivory">${event.title}</h3>
      <p class="text-sm text-ivory/70 line-clamp-3 mb-3">${event.description}</p>
      <span class="text-sm font-medium text-amber">View details</span>
    </article>
  `;
}

function renderEventsGrid(targetId, events) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = events.map((event, i) => eventBlogCardTemplate(event, i)).join("");

  el.querySelectorAll("[data-event-index]").forEach((card) => {
    const open = () => openEventModal(events[Number(card.dataset.eventIndex)]);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

function openEventModal(event) {
  if (typeof openDetailModal !== "function") return;
  const submetaParts = [formatEventDate(event.date), event.time, event.location].filter(Boolean);
  openDetailModal({
    title: event.title,
    meta: "Upcoming event",
    submeta: submetaParts.join(" · "),
    image: event.image,
    paragraphs: event.details && event.details.length ? event.details : [event.description],
    footerHtml: `<a href="registration.html" class="inline-flex items-center gap-2 gradient-bg text-ivory px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">Register interest</a>`,
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SITE_CONTENT === "undefined") return;

  const el = document.getElementById("events-list");
  if (el) renderEvents("events-list", SITE_CONTENT.events);

  const gridEl = document.getElementById("events-grid");
  if (gridEl) renderEventsGrid("events-grid", SITE_CONTENT.events.slice(0, 3));
});
