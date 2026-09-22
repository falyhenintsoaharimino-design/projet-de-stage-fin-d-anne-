# Jokiny — front-end (HTML / CSS / JS statique)

Front-end du projet *Système intelligent d'orientation des citoyens vers les
services administratifs*. HTML/CSS/JS pur (aucun framework), pour rester
lisible en licence et facile à brancher sur n'importe quel back-end (Flask,
FastAPI, Node…) sans réécriture.

## Choix de design

- **Couleurs** : `--color-primary` (#0F3D3E, teal profond) porte la confiance
  institutionnelle ; `--color-accent` (#E08D3C, ocre) est réservé aux actions
  qui font avancer une démarche (demander, prendre rendez-vous). Fond
  `--color-paper` neutre et clair, pas de gris SaaS générique.
- **Typographie** : *Public Sans*, la police conçue pour les services publics
  numériques — cohérente avec le sujet, une seule famille (poids 400 à 800).
- **Mise en page** : la page d'accueil met en avant la barre de saisie de
  l'assistant (le vrai cœur du projet) plutôt qu'une image d'illustration.
  Les listes de services utilisent des lignes bordées (`.entry-list`) plutôt
  que des cartes à ombre partout ; les cartes (`.service-card`) ne servent
  que là où l'utilisateur compare vraiment des options (catalogue).
- Tous les jetons (couleurs, espacements, typographie) sont dans
  `css/variables.css` : c'est le seul fichier à modifier pour ajuster
  l'identité visuelle.

## Arborescence

```
frontend/
├── README.md
├── css/
│   ├── variables.css      # jetons de design (couleurs, type, espacement)
│   ├── base.css            # reset + typographie de base
│   ├── layout.css          # en-tête, pied de page, app-shell (espaces connectés)
│   ├── components.css      # boutons, champs, badges, listes, panneaux, chat
│   └── pages/               # styles propres à une page (chargés en plus des précédents)
│       ├── accueil.css
│       ├── assistant.css
│       ├── catalogue.css
│       └── dashboard.css    # réutilisé par citoyen / agent / responsable / admin
├── js/
│   ├── api.js               # point de passage unique vers le back-end (voir plus bas)
│   ├── main.js               # menu mobile, lien de nav actif — chargé sur toutes les pages
│   ├── assistant.js           # logique du chat d'orientation
│   └── catalogue.js            # recherche/filtre du catalogue
├── data/
│   └── services.json        # jeu de données de démonstration (remplace l'API tant qu'elle n'existe pas)
├── partials/
│   ├── header.html          # en-tête public de référence, à copier dans les nouvelles pages
│   └── footer.html
└── pages/
    ├── public/               # espace visiteur (aucun compte requis)
    │   ├── index.html         # ✅ fait — accueil
    │   ├── assistant.html      # ✅ fait — assistant d'orientation
    │   ├── catalogue-services.html  # ✅ fait
    │   ├── fiche-service.html  # ✅ fait
    │   ├── connexion.html      # ✅ fait
    │   ├── inscription.html    # à créer sur le patron de connexion.html
    │   ├── mot-de-passe-oublie.html
    │   ├── fiche-procedure.html
    │   ├── comment-ca-marche.html
    │   ├── faq.html
    │   ├── contact.html
    │   └── mentions-legales.html
    ├── citoyen/               # connecté — voir A_FAIRE.md dans ce dossier
    │   ├── tableau-de-bord.html  # ✅ fait — patron de l'app-shell
    │   └── A_FAIRE.md
    ├── agent/                 # connecté — voir A_FAIRE.md
    ├── responsable/            # connecté — voir A_FAIRE.md
    └── admin/                  # connecté — voir A_FAIRE.md
```

Chaque dossier `pages/<espace>/A_FAIRE.md` liste les pages restantes de cet
espace avec, pour chacune, quels composants CSS réutiliser — c'est la suite
directe de la section 3 du guide de projet (plan du site).

## Où mettre les fichiers dans le dépôt du projet

Si le dépôt du projet est organisé comme le suggère le guide (front / API /
moteur IA séparés), placez ce dossier `frontend/` tel quel à la racine :

```
orientation-citoyens/
├── frontend/     ← ce dossier
├── api/          ← back-end REST (chapitre 8 du cahier des charges)
├── moteur-ia/    ← service d'orientation (TF-IDF puis embeddings/RAG)
├── mobile/       ← application mobile ou PWA
└── docs/         ← cahier des charges, UML, manuel utilisateur, mémoire
```

- Ne modifiez `data/services.json` que pour la démo locale ; les vraies
  données viendront de la table `service`/`procedure`/`document_requis`
  (voir chapitre 9 du cahier des charges) via l'API.
- `css/` et `js/` ne dépendent d'aucun outil de build : ils fonctionnent tels
  quels si le back-end sert simplement le dossier `frontend/` en statique
  (`app.use(express.static("frontend"))`, `StaticFiles` en FastAPI, etc.).

## Lancer le projet en local

Comme les pages font des `fetch()` (vers `data/services.json`), ouvrez-les
via un petit serveur local plutôt qu'en double-cliquant sur le fichier :

```bash
cd frontend
python3 -m http.server 8000
# puis ouvrir http://localhost:8000/pages/public/index.html
```

## Brancher l'API plus tard

Toute la communication réseau passe par `js/api.js`. Quand l'API REST du
chapitre 8 sera prête :

1. Ouvrez `js/api.js`.
2. Passez `ENDPOINTS.mock` à `false`.
3. Adaptez `API_BASE_URL` si besoin.

Aucune page HTML n'a besoin d'être modifiée : elles appellent toutes
`window.JokinyAPI.listServices()` / `demanderOrientation()`, jamais `fetch`
directement.

## Accessibilité et responsive

- Focus clavier toujours visible (`:focus-visible` dans `base.css`).
- `prefers-reduced-motion` respecté.
- Menu mobile sous 860 px, grilles qui repassent en une colonne sous 640–900 px
  selon la page (voir les media queries en bas de chaque fichier `css/pages/*.css`).
- Contrastes du palette vérifiés pour un usage sur écrans d'entrée de gamme
  (contrainte technique du cahier des charges, chapitre 10).
