import { isOnboardingCompleted, setApiEndpoint } from '../utils/storage.js';

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    console.log('ProseAI: Extension installed');
    
    // Set production API endpoint
    await setApiEndpoint('https://prose-ai-nine.vercel.app');
    
    const completed = await isOnboardingCompleted();
    if (!completed) {
      chrome.tabs.create({
        url: chrome.runtime.getURL('onboarding/onboarding.html')
      });
    }
  } else if (details.reason === 'update') {
    console.log('ProseAI: Extension updated');
    // Update API endpoint on extension update too
    await setApiEndpoint('https://prose-ai-nine.vercel.app');
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ONBOARDING_COMPLETED') {
    console.log('ProseAI: Onboarding completed');
    
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        if (tab.url?.includes('whatsapp.com') || 
            tab.url?.includes('telegram.org') || 
            tab.url?.includes('linkedin.com')) {
          chrome.tabs.sendMessage(tab.id, { type: 'SETTINGS_UPDATED' }).catch(() => {});
        }
      });
    });
    
    sendResponse({ success: true });
  }
  
  return true;
});

console.log('ProseAI: Background service worker loaded');
