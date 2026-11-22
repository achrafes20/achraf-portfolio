// Accès sûr à localStorage : il peut être indisponible (navigation privée,
// cookies bloqués, quota atteint). Le site doit fonctionner sans lui.

export function readStorage(key, fallback = null) {
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Préférence simplement non mémorisée.
  }
}
