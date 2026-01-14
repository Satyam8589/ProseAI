import { 
  getSelectedApps, 
  setSelectedApps, 
  getApiEndpoint, 
  setApiEndpoint,
  storage,
  STORAGE_KEYS
} from '../utils/storage.js';

const appCheckboxes = {
  whatsapp: document.getElementById('app-whatsapp'),
  telegram: document.getElementById('app-telegram'),
  linkedin: document.getElementById('app-linkedin')
};

const apiEndpointInput = document.getElementById('api-endpoint');
const saveBtn = document.getElementById('save-btn');
const statusMessage = document.getElementById('status-message');
const resetOnboardingLink = document.getElementById('reset-onboarding');

async function loadSettings() {
  const selectedApps = await getSelectedApps();
  const apiEndpoint = await getApiEndpoint();

  Object.keys(appCheckboxes).forEach(app => {
    appCheckboxes[app].checked = selectedApps.includes(app);
  });

  apiEndpointInput.value = apiEndpoint;
}

async function saveSettings() {
  const selectedApps = Object.keys(appCheckboxes)
    .filter(app => appCheckboxes[app].checked);

  if (selectedApps.length === 0) {
    showStatus('Please select at least one app', 'error');
    return;
  }

  const apiEndpoint = apiEndpointInput.value.trim();
  
  if (!apiEndpoint) {
    showStatus('Please enter an API endpoint', 'error');
    return;
  }

  // Prevent accidentally saving common messaging URLs as the API
  if (apiEndpoint.includes('whatsapp.com') || 
      apiEndpoint.includes('telegram.org') || 
      apiEndpoint.includes('linkedin.com')) {
    showStatus('Invalid API: Cannot use chat app URL as endpoint', 'error');
    return;
  }

  try {
    await setSelectedApps(selectedApps);
    await setApiEndpoint(apiEndpoint);

    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        if (tab.url?.includes('whatsapp.com') || 
            tab.url?.includes('telegram.org') || 
            tab.url?.includes('linkedin.com')) {
          chrome.tabs.sendMessage(tab.id, { type: 'SETTINGS_UPDATED' }).catch(() => {});
        }
      });
    });

    showStatus('Settings saved successfully!', 'success');
  } catch (error) {
    console.error('Error saving settings:', error);
    showStatus('Failed to save settings', 'error');
  }
}

function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message status-${type}`;
  
  setTimeout(() => {
    statusMessage.textContent = '';
    statusMessage.className = 'status-message';
  }, 3000);
}

async function resetOnboarding() {
  if (confirm('This will reset the onboarding process. Continue?')) {
    await storage.set({ [STORAGE_KEYS.ONBOARDING_COMPLETED]: false });
    
    chrome.tabs.create({
      url: chrome.runtime.getURL('onboarding/onboarding.html')
    });
    
    window.close();
  }
}

saveBtn.addEventListener('click', saveSettings);
resetOnboardingLink.addEventListener('click', (e) => {
  e.preventDefault();
  resetOnboarding();
});

loadSettings();
