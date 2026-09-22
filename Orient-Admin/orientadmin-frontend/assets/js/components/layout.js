/* ==========================================================================
   Génération de l'en-tête, du menu latéral et du pied de page.
   Chaque page HTML contient seulement des emplacements vides :
     <div id="site-header"></div>, <aside id="site-sidebar"></aside>, <div id="site-footer"></div>
   et déclare son contexte sur la balise <body> :
     data-role="citoyen"   -> type d'utilisateur (voir nav-config.js)
     data-page="profil"    -> page active dans le menu
     data-root="../../"    -> chemin relatif vers la racine du projet
   ========================================================================== */
(function () {
  "use strict";

  var body = document.body;
  var role = body.dataset.role || "visiteur";
  var root = body.dataset.root || "./";
  var page = body.dataset.page || "";
  var nav = window.OrientAdmin.nav;
  var current = nav.roles[role];

  /* Fabrique un lien HTML à partir d'un élément de menu */
  function linkHtml(item, cssClass) {
    var active = item.id === page ? " is-active" : "";
    return '<a class="' + cssClass + active + '" href="' + root + item.href + '">' + item.label + "</a>";
  }

  /* ----- En-tête ----- */
  function renderHeader() {
    var target = document.getElementById("site-header");
    if (!target) { return; }

    var navHtml = "";
    var actionsHtml = "";

    if (role === "visiteur") {
      navHtml = '<nav class="site-nav" id="site-nav" aria-label="Navigation principale">' +
        current.items.map(function (i) { return linkHtml(i, ""); }).join("") + "</nav>";
      actionsHtml =
        '<a class="btn btn--outline btn--sm" href="' + root + nav.authLinks.connexion + '">Connexion</a>' +
        '<a class="btn btn--primary btn--sm" href="' + root + nav.authLinks.inscription + '">S\'inscrire</a>';
    } else {
      actionsHtml =
        '<span class="badge badge--info">' + current.label + "</span>" +
        '<a class="btn btn--outline btn--sm" href="' + root + nav.apercu + '">Quitter l\'espace</a>';
    }

    target.innerHTML =
      '<a class="skip-link" href="#contenu">Aller au contenu</a>' +
      '<header class="site-header"><div class="site-header__inner">' +
      '<button class="site-header__toggle" type="button" aria-label="Ouvrir le menu" data-toggle-menu><span class="burger"></span></button>' +
      '<a class="brand" href="' + root + 'index.html"><span class="brand__mark">O</span>' + nav.brand + "</a>" +
      navHtml +
      '<div class="site-header__actions">' + actionsHtml + "</div>" +
      "</div></header>";
  }

  /* ----- Menu latéral (espaces connectés uniquement) ----- */
  function renderSidebar() {
    var target = document.getElementById("site-sidebar");
    if (!target || !current.groups) { return; }

    target.className = "sidebar";
    target.setAttribute("aria-label", "Menu de l'espace");
    target.innerHTML = current.groups.map(function (group) {
      return '<div class="sidebar__group"><p class="sidebar__title">' + group.title + "</p>" +
        group.items.map(function (i) { return linkHtml(i, "sidebar__link"); }).join("") + "</div>";
    }).join("");
  }

  /* ----- Pied de page ----- */
  function renderFooter() {
    var target = document.getElementById("site-footer");
    if (!target) { return; }
    target.innerHTML =
      '<footer class="site-footer"><div class="site-footer__inner">' +
      "<span>&copy; " + nav.brand + " - Projet de licence</span>" +
      '<div class="site-footer__links">' +
      '<a href="' + root + 'pages/public/mentions-legales.html">Mentions légales et confidentialité</a>' +
      '<a href="' + root + 'pages/public/contact.html">Contact</a>' +
      '<a href="' + root + nav.apercu + '">Plan du site</a>' +
      "</div></div></footer>";
  }

  /* ----- Bouton d'ouverture du menu sur mobile ----- */
  function bindToggle() {
    var button = document.querySelector("[data-toggle-menu]");
    if (!button) { return; }
    button.addEventListener("click", function () {
      var menu = document.getElementById("site-nav") || document.getElementById("site-sidebar");
      if (menu) { menu.classList.toggle("is-open"); }
    });
  }

  renderHeader();
  renderSidebar();
  renderFooter();
  bindToggle();
})();
