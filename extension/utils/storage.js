export const storage = {
  async get(keys) {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, (result) => {
        resolve(result);
      });
    });
  },

  async set(items) {
    return new Promise((resolve) => {
      chrome.storage.local.set(items, () => {
        resolve();
      });
    });
  },

  async remove(keys) {
    return new Promise((resolve) => {
      chrome.storage.local.remove(keys, () => {
        resolve();
      });
    });
  },

  async clear() {
    return new Promise((resolve) => {
      chrome.storage.local.clear(() => {
        resolve();
      });
    });
  }
};

export const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: 'onboardingCompleted',
  SELECTED_APPS: 'selectedApps',
  LAST_USED_TONE: 'lastUsedTone',
  API_ENDPOINT: 'apiEndpoint'
};

export async function isOnboardingCompleted() {
  const result = await storage.get(STORAGE_KEYS.ONBOARDING_COMPLETED);
  return result[STORAGE_KEYS.ONBOARDING_COMPLETED] || false;
}

export async function setOnboardingCompleted(completed = true) {
  await storage.set({ [STORAGE_KEYS.ONBOARDING_COMPLETED]: completed });
}

export async function getSelectedApps() {
  const result = await storage.get(STORAGE_KEYS.SELECTED_APPS);
  return result[STORAGE_KEYS.SELECTED_APPS] || [];
}

export async function setSelectedApps(apps) {
  await storage.set({ [STORAGE_KEYS.SELECTED_APPS]: apps });
}

export async function getLastUsedTone() {
  const result = await storage.get(STORAGE_KEYS.LAST_USED_TONE);
  return result[STORAGE_KEYS.LAST_USED_TONE] || 'professional';
}

export async function setLastUsedTone(tone) {
  await storage.set({ [STORAGE_KEYS.LAST_USED_TONE]: tone });
}

export async function getApiEndpoint() {
  const result = await storage.get(STORAGE_KEYS.API_ENDPOINT);
  return result[STORAGE_KEYS.API_ENDPOINT] || 'http://localhost:3000';
}

export async function setApiEndpoint(endpoint) {
  await storage.set({ [STORAGE_KEYS.API_ENDPOINT]: endpoint });
}
