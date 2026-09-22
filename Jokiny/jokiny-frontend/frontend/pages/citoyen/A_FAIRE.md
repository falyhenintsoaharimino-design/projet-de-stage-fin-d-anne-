# Espace citoyen — pages restantes

`tableau-de-bord.html` est le patron (app-shell : en-tête + sidebar + `.app-main`).
Dupliquez sa structure pour ces pages, en changeant `aria-current="page"` sur le bon lien de la sidebar :

- `assistant-chat.html` — reprend `assistant.html` + `assistant.js`, dans l'app-shell au lieu du header public.
- `mes-demandes.html` — `.entry-list` avec badges de statut (`badge--pending/success/warning`), filtre par statut.
- `detail-demande.html` — `.panel` avec chronologie (réutiliser `.steps` pour l'historique) + documents fournis/manquants.
- `prendre-rendez-vous.html` — formulaire : service (pré-rempli via `?service=`), choix de créneau (grille de `.chip`), récapitulatif.
- `mes-rendez-vous.html` — `.entry-list` séparée en « à venir » / « passés », actions modifier/annuler.
- `notifications.html` — `.entry-list` avec icône par type (confirmation, rappel, alerte).
- `profil.html` — `.form-card` : infos personnelles, langue, canaux de notification, mot de passe.
- `avis.html` — note (étoiles) + commentaire, affiché après un rendez-vous clôturé.
