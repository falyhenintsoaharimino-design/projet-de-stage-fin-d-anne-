# OrientAdmin — Frontend (maquette statique)

Frontend statique (HTML, CSS, JavaScript, sans framework ni serveur) de la
plateforme d'orientation des citoyens vers les services administratifs.
Sert de base visuelle et structurelle avant le branchement à une vraie API.

## Comment l'ouvrir

Ouvrir `index.html` dans un navigateur, ou lancer un petit serveur local
(recommandé, car certains navigateurs bloquent les scripts en `file://`) :

    cd orientadmin-frontend
    python3 -m http.server 8000

puis ouvrir http://localhost:8000

`pages/apercu.html` liste toutes les pages du site, classées par type
d'utilisateur : c'est le point de départ pour naviguer partout.

## Arborescence

```
orientadmin-frontend/
├── index.html                  Page d'accueil (visiteur)
│
├── assets/
│   ├── css/
│   │   ├── main.css            Point d'entrée : importe tout le reste, dans l'ordre
│   │   ├── base/                variables.css (couleurs, espacements) · reset.css · typography.css
│   │   ├── layout/               shell.css (grilles, conteneurs) · header.css · sidebar.css · footer.css
│   │   ├── components/           un fichier par composant réutilisable
│   │   │                         (buttons, cards, forms, tables, badges, alerts,
│   │   │                          chat, calendar, charts, timeline, tabs, accordion, notifications)
│   │   └── pages/                styles propres à UNE page (home.css, assistant.css)
│   │
│   ├── js/
│   │   ├── config/nav-config.js       la liste de toutes les pages, par rôle (menus générés d'ici)
│   │   ├── components/layout.js       construit l'en-tête, le menu latéral, le pied de page
│   │   ├── pages/assistant.js         logique de la page assistant (simulation du moteur)
│   │   └── main.js                    comportements génériques (filtres, calendrier, créneaux)
│   │
│   ├── img/, icons/, fonts/     ressources statiques (vides pour l'instant)
│
├── data/services.json          Exemple de données ; à remplacer par de vrais appels API
│
└── pages/
    ├── public/      Pages accessibles sans compte (catalogue, procédures, FAQ...)
    ├── auth/         Connexion, inscription, mot de passe oublié
    ├── citoyen/      Espace du citoyen inscrit
    ├── agent/        Espace de l'agent administratif
    ├── responsable/  Espace du responsable des services publics
    ├── admin/        Espace de l'administrateur système
    ├── erreurs/      Page 404
    └── apercu.html   Plan du site : liste toutes les pages par rôle
```

## Principe de chaque page HTML

Chaque fichier `.html` est volontairement minimal : il ne contient que le
contenu propre à la page. L'en-tête, le menu et le pied de page sont
injectés au chargement par `assets/js/components/layout.js`, à partir de
deux informations posées sur la balise `<body>` :

```html
<body data-role="citoyen" data-page="profil" data-root="../../">
  <div id="site-header"></div>
  <div class="app-shell">
    <aside id="site-sidebar"></aside>
    <main id="contenu" class="app-shell__main">
      ... contenu propre à la page ...
    </main>
  </div>
  <div id="site-footer"></div>
</body>
```

- `data-role` : `visiteur`, `citoyen`, `agent`, `responsable` ou `admin`
  → détermine quel menu afficher (voir `nav-config.js`).
- `data-page` : identifiant de la page → sert à surligner le lien actif.
- `data-root` : chemin relatif vers la racine du projet (`./`, `../../`...)
  → permet aux liens et scripts de fonctionner depuis n'importe quel dossier.

**Pour ajouter une page à un menu**, il suffit d'ajouter une ligne dans
`assets/js/config/nav-config.js` : rien à toucher dans le HTML des autres pages.

## Où mettre chaque nouveau fichier

| Je veux...                                            | Je le mets dans...                          |
|--------------------------------------------------------|----------------------------------------------|
| Changer une couleur, un espacement global               | `assets/css/base/variables.css`             |
| Styler un nouveau type de bloc réutilisable (ex. un carrousel) | `assets/css/components/<nom>.css` + import dans `main.css` |
| Styler une page en particulier, sans réutilisation ailleurs | `assets/css/pages/<nom>.css` + import dans `main.css` |
| Ajouter une page pour un rôle existant                  | `pages/<role>/<nom>.html` + entrée dans `nav-config.js` |
| Ajouter un comportement interactif propre à une page     | `assets/js/pages/<nom>.js`, chargé seulement par cette page |
| Ajouter un comportement générique (utilisé sur plusieurs pages) | `assets/js/main.js`, via un attribut `data-*` |
| Ajouter une image, une icône                            | `assets/img/` ou `assets/icons/`            |

## Limites actuelles (à faire évoluer)

- Le moteur d'orientation de `pages/public/assistant.html` et
  `pages/citoyen/assistant.html` est **simulé** en JavaScript
  (`assets/js/pages/assistant.js`, fonction `askEngine`). Il est à
  remplacer par un appel à l'API réelle (`fetch(...)`) quand le
  back-end existe.
- Aucune authentification réelle : les pages `pages/auth/` sont des
  formulaires sans traitement.
- Les données affichées (rendez-vous, statistiques...) sont des exemples
  écrits en dur dans le HTML, à remplacer par des données venant de l'API.
- Les graphiques (barres, carte de chaleur) sont faits en CSS pur pour
  rester lisibles sans dépendance ; une bibliothèque (Chart.js, D3...)
  pourra les remplacer plus tard sans changer la structure des pages.
