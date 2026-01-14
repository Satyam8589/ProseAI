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
  triggerButton.title = 'ProseAI - Click to rewrite | Drag to move';
  triggerButton.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;

  triggerButton.style.display = 'none';

  let isDragging = false;
  let startX, startY;
  let hasDragged = false;

  triggerButton.addEventListener('mousedown', (e) => {
    // Only drag with left click
    if (e.button !== 0) return;
    
    isDragging = true;
    hasDragged = false;
    startX = e.clientX - triggerButton.offsetLeft;
    startY = e.clientY - triggerButton.offsetTop;
    
    // Disable transitions during drag for smoothness
    triggerButton.style.transition = 'none';
    
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    hasDragged = true;
    const x = e.clientX - startX;
    const y = e.clientY - startY;
    
    triggerButton.style.left = `${x}px`;
    triggerButton.style.top = `${y}px`;
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    
    isDragging = false;
    // Re-enable transitions
    triggerButton.style.transition = 'all 0.2s';
  });

  triggerButton.addEventListener('click', (e) => {
    // Don't open if we were just dragging
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

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

  window.addEventListener('resize', () => {
    // Only auto-reposition if it's currently at its default position
    // or if the window is resized. For now, let's just let it stay where it is.
  });
}

function positionTriggerButton(inputElement) {
  if (!triggerButton || !inputElement) return;

  const rect = inputElement.getBoundingClientRect();
  
  // Position above the input, aligned to the right side
  const top = rect.top + window.scrollY - 45; // 40px height + 5px margin
  const left = rect.right + window.scrollX - 40; // Aligned to right edge

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
