# Espace responsable des services publics

App-shell + `.stat-grid` en haut de chaque page, alimenté par l'API `/api/statistiques` (mock possible via un fichier `data/statistiques.json` sur le même principe que `data/services.json`).

- `tableau-de-bord-stats.html` — vue d'ensemble : demandes par service, par période.
- `affluence.html` — heatmap jours/heures (canvas ou grille CSS colorée selon densité), temps d'attente estimé.
- `satisfaction.html` — note moyenne, évolution, commentaires récents (`.entry-list`).
- `performance-orientation.html` — taux de bonne orientation, réorientations, demandes non comprises (utile pour le mémoire : ce sont les métriques du chapitre 7 du cahier des charges).
- `rapports.html` — formulaire de période + boutons d'export (PDF/Excel/CSV) : `.form-card` + `.btn--outline` par format.
