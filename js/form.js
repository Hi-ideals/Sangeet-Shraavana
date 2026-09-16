/**
 * form.js
 * Client-side validation for contact / registration forms.
 * NOTE: There is no backend connected. On successful validation we
 * simulate a submit state and show a success message. Replace the
 * `simulateSubmit` function with a real fetch() call to your API
 * endpoint once a backend exists — see the marked TODO below.
 */

const VALIDATORS = {
  required: (value) => value.trim().length > 0,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
  phone: (value) => /^[+]?[\d\s-]{10,15}$/.test(value.trim()),
};

function validateField(field) {
  const value = field.value;
  const rules = (field.dataset.validate || "").split(" ").filter(Boolean);
  const errorEl = document.getElementById(`${field.id}-error`);

  for (const rule of rules) {
    if (rule === "required" && !VALIDATORS.required(value)) {
      showError(field, errorEl, "This field is required.");
      return false;
    }
    if (rule === "email" && value.trim() && !VALIDATORS.email(value)) {
      showError(field, errorEl, "Enter a valid email address.");
      return false;
    }
    if (rule === "phone" && value.trim() && !VALIDATORS.phone(value)) {
      showError(field, errorEl, "Enter a valid phone number.");
      return false;
    }
  }

  clearError(field, errorEl);
  return true;
}

function showError(field, errorEl, message) {
  field.classList.add("field-invalid");
  field.setAttribute("aria-invalid", "true");
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add("is-visible");
  }
}

function clearError(field, errorEl) {
  field.classList.remove("field-invalid");
  field.removeAttribute("aria-invalid");
  if (errorEl) {
    errorEl.textContent = "";
    errorEl.classList.remove("is-visible");
  }
}

function initForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const fields = form.querySelectorAll("[data-validate]");
  const submitBtn = form.querySelector("[type='submit']");
  const successEl = form.querySelector(".form-success");

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) {
      form.querySelector(".field-invalid")?.focus();
      return;
    }

    setLoadingState(submitBtn, true);

    // TODO: Replace this simulated delay with a real API call, e.g.:
    // fetch("/api/contact", { method: "POST", body: new FormData(form) })
    //   .then(...)
    simulateSubmit().then(() => {
      setLoadingState(submitBtn, false);
      form.reset();
      if (successEl) {
        successEl.classList.remove("hidden");
        successEl.setAttribute("tabindex", "-1");
        successEl.focus();
      }
    });
  });
}

function setLoadingState(button, isLoading) {
  if (!button) return;
  button.disabled = isLoading;
  button.dataset.originalText = button.dataset.originalText || button.textContent;
  button.textContent = isLoading ? "Sending…" : button.dataset.originalText;
}

function simulateSubmit() {
  return new Promise((resolve) => setTimeout(resolve, 900));
}

document.addEventListener("DOMContentLoaded", () => {
  initForm("contact-form");
  initForm("registration-form");
});
