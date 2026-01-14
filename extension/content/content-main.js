import { detectPlatform, getMessageInput } from './selectors.js';
import { FloatingPanel } from './ui-injector.js';
import { getSelectedApps, isOnboardingCompleted } from '../utils/storage.js';

let floatingPanel = null;
let triggerButton = null;
let currentInputElement = null;

async function init() {
  const completed = await isOnboardingCompleted();
  
  if (!completed) {
    console.log('ProseAI: Onboarding not completed');
    return;
  }

  const platform = detectPlatform();
  
  if (!platform) {
    console.log('ProseAI: Unsupported platform');
    return;
  }

  const selectedApps = await getSelectedApps();
  
  if (!selectedApps.includes(platform)) {
    console.log(`ProseAI: ${platform} not enabled`);
    return;
  }

  console.log(`ProseAI: Initializing on ${platform}`);
  setupMessageInputObserver(platform);
}

function setupMessageInputObserver(platform) {
  const checkForInput = () => {
    const inputElement = getMessageInput(platform);
    
    if (inputElement && inputElement !== currentInputElement) {
      currentInputElement = inputElement;
      attachToInput(inputElement);
    }
  };

  checkForInput();

  const observer = new MutationObserver(() => {
    checkForInput();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  setInterval(checkForInput, 2000);
}

function attachToInput(inputElement) {
  console.log('ProseAI: Attached to input element');

  if (floatingPanel) {
    floatingPanel.destroy();
  }

  floatingPanel = new FloatingPanel(inputElement);

  createTriggerButton(inputElement);

  inputElement.addEventListener('focus', () => {
    if (triggerButton) {
      triggerButton.style.display = 'flex';
    }
  });

  inputElement.addEventListener('blur', (e) => {
    setTimeout(() => {
      if (triggerButton && !floatingPanel?.isVisible) {
        const activeElement = document.activeElement;
        if (!triggerButton.contains(activeElement)) {
          triggerButton.style.display = 'none';
        }
      }
    }, 200);
  });
}

function createTriggerButton(inputElement) {
  if (triggerButton) {
    triggerButton.remove();
  }

  triggerButton = document.createElement('button');
  triggerButton.className = 'proseai-trigger-btn';
  triggerButton.title = 'ProseAI - Rewrite with AI';
  triggerButton.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;

  triggerButton.style.display = 'none';

  triggerButton.addEventListener('mousedown', (e) => {
    e.preventDefault();
  });

  triggerButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (floatingPanel.isVisible) {
      floatingPanel.hide();
    } else {
      floatingPanel.show();
    }
  });

  document.body.appendChild(triggerButton);
  positionTriggerButton(inputElement);

  window.addEventListener('resize', () => positionTriggerButton(inputElement));
  window.addEventListener('scroll', () => positionTriggerButton(inputElement));
}

function positionTriggerButton(inputElement) {
  if (!triggerButton || !inputElement) return;

  const rect = inputElement.getBoundingClientRect();
  
  const top = rect.top + window.scrollY + (rect.height / 2) - 20;
  const left = rect.right + window.scrollX + 10;

  triggerButton.style.top = `${top}px`;
  triggerButton.style.left = `${left}px`;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SETTINGS_UPDATED') {
    console.log('ProseAI: Settings updated, reinitializing...');
    
    if (floatingPanel) {
      floatingPanel.destroy();
      floatingPanel = null;
    }
    
    if (triggerButton) {
      triggerButton.remove();
      triggerButton = null;
    }
    
    currentInputElement = null;
    
    setTimeout(init, 500);
  }
  
  sendResponse({ success: true });
  return true;
});

console.log('ProseAI: Content script loaded');
