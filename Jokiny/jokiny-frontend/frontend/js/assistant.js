/**
 * assistant.js — logique de la page assistant.html.
 * Envoie le texte du citoyen à JokinyAPI.demanderOrientation() et affiche
 * la conversation ainsi que le panneau de résultat (service, confiance, pièces).
 */

function ajouterMessage(thread, texte, auteur) {
  const li = document.createElement("li");
  li.className = `msg msg--${auteur}`;
  li.textContent = texte;
  thread.appendChild(li);
  thread.scrollTop = thread.scrollHeight;
  return li;
}

function afficherResultat(panel, resultat) {
  const { service, confiance, alternatives } = resultat;
  const pourcentage = Math.round(confiance * 100);
  const niveau = confiance < 0.55 ? "confidence--faible" : "";

  panel.innerHTML = `
    <div class="panel__title">
      <h3>Service recommandé</h3>
      <span class="badge badge--success">${service.rubrique}</span>
    </div>
    <h2 style="font-size: var(--text-lg)">${service.nom}</h2>
    <p>${service.resume}</p>

    <div class="confidence ${niveau}">
      <div class="confidence__bar"><div class="confidence__fill" style="width:${pourcentage}%"></div></div>
      <span class="confidence__value">${pourcentage}%</span>
    </div>

    <ul class="result-panel__pieces">
      ${service.pieces.map((p) => `<li>— ${p}</li>`).join("")}
    </ul>

    <p class="field__hint">Délai indicatif : ${service.delai} · ${service.lieu}</p>

    <a class="btn btn--accent btn--block" href="../citoyen/prendre-rendez-vous.html?service=${service.id}">
      Prendre rendez-vous
    </a>

    ${
      alternatives?.length
        ? `<p class="field__hint" style="margin-top:var(--space-4)">
             Pas le bon service ? ${alternatives.map((a) => a.nom).join(" · ")}
           </p>`
        : ""
    }
  `;
}

function initAssistant() {
  const form = document.querySelector("#assistant-form");
  const thread = document.querySelector("#chat-thread");
  const resultPanel = document.querySelector("#result-panel");
  if (!form || !thread) return;

  document.querySelectorAll("[data-suggestion]").forEach((chip) => {
    chip.addEventListener("click", () => {
      form.querySelector("textarea").value = chip.dataset.suggestion;
      form.requestSubmit();
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const champ = form.querySelector("textarea");
    const texte = champ.value.trim();
    if (!texte) return;

    ajouterMessage(thread, texte, "citoyen");
    champ.value = "";

    const attente = ajouterMessage(thread, "Je regarde ça…", "assistant");

    try {
      const resultat = await window.JokinyAPI.demanderOrientation(texte);
      attente.textContent = `Il semble s'agir d'une demande liée à « ${resultat.service.nom} ». Voici les détails :`;
      afficherResultat(resultPanel, resultat);
    } catch (err) {
      attente.textContent = "Désolé, je n'ai pas pu traiter la demande. Réessayez dans un instant.";
    }
  });
}

document.addEventListener("DOMContentLoaded", initAssistant);
