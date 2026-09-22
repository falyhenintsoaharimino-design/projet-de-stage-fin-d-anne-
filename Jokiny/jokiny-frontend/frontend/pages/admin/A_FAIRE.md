# Espace administrateur système

App-shell, sidebar admin. C'est l'espace qui alimente la base de connaissances utilisée par toutes les autres pages (`data/services.json` → vraie table `service`/`procedure`/`document_requis` côté back-end).

- `utilisateurs.html` — table des comptes, rôle, service rattaché (agents), actions activer/désactiver.
- `catalogue-base-connaissances.html` — CRUD des services/procédures/documents ; réutilise les composants `.entry-list` + `.form-card`.
- `moteur-orientation.html` — jeu d'exemples d'entraînement, réentraînement, métriques (précision/rappel), demandes mal comprises à corriger.
- `securite-journal.html` — journal des connexions et actions sensibles (`.entry-list` avec horodatage).
- `parametres.html` — modèles d'e-mails/SMS, jours fériés, durée des créneaux, sauvegardes.
