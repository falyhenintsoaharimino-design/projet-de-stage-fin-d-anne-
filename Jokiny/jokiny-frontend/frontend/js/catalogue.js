/**
 * catalogue.js — logique de la page catalogue-services.html.
 * Charge /data/services.json (ou l'API une fois branchée) et gère
 * la recherche texte + le filtre par rubrique.
 */

function carteService(service) {
  return `
    <article class="service-card">
      <span class="service-card__rubrique">${service.rubrique}</span>
      <h3>${service.nom}</h3>
      <p>${service.resume}</p>
      <div class="service-card__foot">
        <span>${service.delai}</span>
        <a class="btn--text" href="fiche-service.html?id=${service.id}">Voir la fiche</a>
      </div>
    </article>
  `;
}

function initCatalogue() {
  const grid = document.querySelector("#service-grid");
  const search = document.querySelector("#catalogue-search");
  const rail = document.querySelector("#rubrique-rail");
  if (!grid) return;

  let services = [];
  let rubriqueActive = "Toutes";

  function rendre() {
    const q = (search?.value ?? "").toLowerCase();
    const filtres = services.filter((s) => {
      const matchRubrique = rubriqueActive === "Toutes" || s.rubrique === rubriqueActive;
      const matchTexte = s.nom.toLowerCase().includes(q) || s.resume.toLowerCase().includes(q);
      return matchRubrique && matchTexte;
    });
    grid.innerHTML = filtres.length
      ? filtres.map(carteService).join("")
      : `<p>Aucun service ne correspond à cette recherche.</p>`;
  }

  window.JokinyAPI.listServices().then((data) => {
    services = data;

    if (rail) {
      const rubriques = ["Toutes", ...new Set(services.map((s) => s.rubrique))];
      rail.innerHTML = rubriques
        .map(
          (r, i) =>
            `<button class="chip" data-rubrique="${r}" aria-pressed="${i === 0}">${r}</button>`
        )
        .join("");
      rail.addEventListener("click", (event) => {
        const btn = event.target.closest("[data-rubrique]");
        if (!btn) return;
        rail.querySelectorAll("[data-rubrique]").forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        rubriqueActive = btn.dataset.rubrique;
        rendre();
      });
    }

    rendre();
  });

  search?.addEventListener("input", rendre);
}

document.addEventListener("DOMContentLoaded", initCatalogue);
