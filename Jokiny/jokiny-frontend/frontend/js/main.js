/**
 * main.js — comportements communs à toutes les pages :
 * menu mobile, marquage du lien de navigation actif.
 * Chaque page ne charge que ce dont elle a besoin en plus (assistant.js, etc.).
 */

function initNavToggle() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  if (!header || !toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("site-header--open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function markActiveNavLink() {
  const current = document.body.dataset.page;
  if (!current) return;
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    if (link.dataset.navLink === current) {
      link.setAttribute("aria-current", "page");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  markActiveNavLink();
});
