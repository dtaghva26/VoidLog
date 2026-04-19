export async function readStoredJSON(key, fallback = null) {
  try {
    const result = await window.storage.get(key);
    if (!result?.value) return fallback;
    return JSON.parse(result.value);
  } catch {
    return fallback;
  }
}

export async function writeStoredJSON(key, value) {
  try {
    await window.storage.set(key, JSON.stringify(value));
  } catch {
    // Best-effort persistence.
  }
}
