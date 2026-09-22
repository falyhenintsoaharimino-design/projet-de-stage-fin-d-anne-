/* ==========================================================================
   Assistant d'orientation : SIMULATION côté navigateur.
   Les règles ci-dessous seront remplacées par un appel à l'API du moteur
   d'orientation (voir la fonction askEngine).
   ========================================================================== */
(function () {
  "use strict";

  var root = document.body.dataset.root || "./";
  var role = document.body.dataset.role || "visiteur";
  var form = document.getElementById("chat-form");
  var input = document.getElementById("chat-input");
  var list = document.getElementById("chat-messages");
  if (!form || !input || !list) { return; }

  /* Règles de démonstration : mot-clé -> service recommandé */
  var RULES = [
    { re: /naissance|extrait/i, service: "Service de l'état civil (mairie)", confidence: 94 },
    { re: /cin|carte d'identit|identit|duplicata/i, service: "Service des cartes d'identité nationales", confidence: 91 },
    { re: /casier|bulletin n/i, service: "Greffe du tribunal - casier judiciaire", confidence: 93 },
    { re: /passeport|voyage/i, service: "Service des passeports", confidence: 90 },
    { re: /permis|conduire|immatricul|v[ée]hicule/i, service: "Service des transports", confidence: 88 },
    { re: /nif|imp[ôo]t|fiscal|taxe/i, service: "Centre fiscal (Direction générale des impôts)", confidence: 89 },
    { re: /entreprise|soci[ée]t[ée]|registre du commerce/i, service: "Guichet unique de création d'entreprise", confidence: 87 },
    { re: /terrain|foncier|cadastre|titre|partage/i, service: "Service foncier", confidence: 86 },
    { re: /r[ée]sidence|fokontany/i, service: "Fokontany (certificat de résidence)", confidence: 92 }
  ];

  /* À remplacer par : fetch(API_URL + "/orientation", { method: "POST", ... }) */
  function askEngine(text) {
    for (var i = 0; i < RULES.length; i++) {
      if (RULES[i].re.test(text)) { return RULES[i]; }
    }
    return null;
  }

  function addBubble(kind, text) {
    var bubble = document.createElement("div");
    bubble.className = "bubble bubble--" + kind;
    var p = document.createElement("p");
    p.textContent = text;
    bubble.appendChild(p);
    list.appendChild(bubble);
    return bubble;
  }

  function addResultCard(bubble, result) {
    var card = document.createElement("div");
    card.className = "result-card";

    var title = document.createElement("p");
    title.className = "result-card__title";
    title.textContent = result.service;

    var meta = document.createElement("p");
    meta.className = "text-small text-muted";
    meta.textContent = "Confiance : " + result.confidence + " %";

    var actions = document.createElement("div");
    actions.className = "result-card__actions";

    var procedure = document.createElement("a");
    procedure.className = "btn btn--outline btn--sm";
    procedure.href = root + "pages/public/procedure.html";
    procedure.textContent = "Voir la procédure";

    var rdv = document.createElement("a");
    rdv.className = "btn btn--primary btn--sm";
    rdv.href = role === "citoyen"
      ? root + "pages/citoyen/prendre-rendez-vous.html"
      : root + "pages/auth/connexion.html";
    rdv.textContent = "Prendre rendez-vous";

    actions.appendChild(procedure);
    actions.appendChild(rdv);
    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(actions);
    bubble.appendChild(card);
  }

  function handleMessage(text) {
    addBubble("user", text);
    var result = askEngine(text);
    if (result) {
      var bubble = addBubble("bot", "Je vous recommande le service suivant :");
      addResultCard(bubble, result);
    } else {
      addBubble("bot", "Je n'ai pas bien compris votre demande. Pouvez-vous préciser le document ou la démarche concernée ?");
    }
    list.scrollTop = list.scrollHeight;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var text = input.value.trim();
    if (!text) { return; }
    input.value = "";
    handleMessage(text);
  });

  /* Question transmise depuis l'accueil : assistant.html?q=... */
  var initialQuestion = new URLSearchParams(window.location.search).get("q");
  if (initialQuestion) { handleMessage(initialQuestion); }

  /* Boutons de suggestion : <button class="suggestion" data-suggestion="..."> */
  document.querySelectorAll("[data-suggestion]").forEach(function (button) {
    button.addEventListener("click", function () { handleMessage(button.dataset.suggestion); });
  });
})();
