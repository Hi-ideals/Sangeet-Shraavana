/**
 * faculty.js
 * Renders faculty portrait cards from content.js.
 */

function facultyCardTemplate(person) {
  return `
    <article class="text-center">
      <div class="faculty-ring tilt-3d w-36 h-36 mx-auto mb-4">
        <img
          src="${person.image}"
          alt="${person.name}, ${person.role} performer"
          width="144" height="144"
          loading="lazy"
          class="w-full h-full object-cover rounded-full"
          onerror="this.src='https://placehold.co/144x144/0a0f2b/d9a441?text=${encodeURIComponent(person.name.split(' ')[0])}'"
        />
      </div>
      <h3 class="font-display text-2xl mb-1">${person.name}</h3>
      <p class="text-sm text-[var(--color-wine)] font-medium mb-2">${person.role}</p>
      <p class="text-sm text-[var(--color-muted)] max-w-xs mx-auto">${person.bio}</p>
    </article>
  `;
}

function renderFaculty(targetId, faculty) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = faculty.map(facultyCardTemplate).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SITE_CONTENT === "undefined") return;
  const el = document.getElementById("faculty-grid");
  if (el) renderFaculty("faculty-grid", SITE_CONTENT.faculty);
});
