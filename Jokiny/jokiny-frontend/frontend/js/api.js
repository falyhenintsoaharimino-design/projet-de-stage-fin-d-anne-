/**
 * api.js — point de passage unique vers le back-end.
 *
 * Tant que l'API (voir cahier des charges, chapitre 8) n'est pas branchée,
 * chaque fonction retombe sur les données locales de /data/services.json
 * pour que les pages restent démontrables. Basculez ENDPOINTS.mock à false
 * une fois l'API REST disponible : aucune page n'a besoin d'être modifiée.
 */

const API_BASE_URL = "/api";

const ENDPOINTS = {
  mock: true,
  services: `${API_BASE_URL}/services`,
  orientation: `${API_BASE_URL}/orientation`,
  rendezvous: `${API_BASE_URL}/rendez-vous`,
};

async function listServices() {
  if (ENDPOINTS.mock) {
    const res = await fetch("/data/services.json");
    return res.json();
  }
  const res = await fetch(ENDPOINTS.services);
  if (!res.ok) throw new Error("Impossible de charger le catalogue des services.");
  return res.json();
}

/**
 * Simule l'appel au moteur d'orientation (POST /api/orientation).
 * Retourne { service, confiance, alternatives } au lieu d'un vrai score
 * de classification tant que le moteur IA n'est pas connecté.
 */
async function demanderOrientation(texte) {
  if (ENDPOINTS.mock) {
    const services = await listServices();
    const mots = texte.toLowerCase();
    const trouve =
      services.find((s) => mots.includes(s.nom.toLowerCase().split(" ")[0])) ??
      services[0];
    return {
      service: trouve,
      confiance: 0.82,
      alternatives: services.filter((s) => s.id !== trouve.id).slice(0, 2),
    };
  }
  const res = await fetch(ENDPOINTS.orientation, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texte }),
  });
  if (!res.ok) throw new Error("Le moteur d'orientation n'a pas répondu.");
  return res.json();
}

window.JokinyAPI = { listServices, demanderOrientation };
