/**
 * localStorage wrapper with an in-memory fallback for contexts where storage
 * is unavailable or throws (private browsing, restrictive in-app webviews).
 */
const memoryStore = new Map<string, string>();

function isStorageAvailable(): boolean {
  try {
    const testKey = "__storage_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = isStorageAvailable() ? window.localStorage.getItem(key) : memoryStore.get(key) ?? null;
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  const raw = JSON.stringify(value);
  try {
    if (isStorageAvailable()) {
      window.localStorage.setItem(key, raw);
      return;
    }
  } catch {
    // fall through to memory store
  }
  memoryStore.set(key, raw);
}
