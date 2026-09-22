# Espace agent administratif

Même patron que `pages/citoyen/tableau-de-bord.html` (app-shell), avec un badge
`Agent` dans l'en-tête et une sidebar propre à cet espace :

- `tableau-de-bord.html` — rendez-vous du jour (`.entry-list`), nouvelles demandes orientées, `.stat-grid` du service.
- `demandes-orientees.html` — liste triable (priorité/statut), action « réorienter » si le moteur s'est trompé.
- `rendez-vous-creneaux.html` — calendrier de disponibilité, définition des créneaux et de leur capacité.
- `fiche-service-edit.html` — reprend la mise en page de `pages/public/fiche-service.html`, en mode édition (champs `.field` au lieu de texte statique).
- `communication.html` — envoi de rappels/messages ciblés aux citoyens (`.form-card` + historique en `.entry-list`).
