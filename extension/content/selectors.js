export const SELECTORS = {
  whatsapp: {
    messageInput: 'div[contenteditable="true"][data-tab="10"]',
    messageInputAlt: 'div[contenteditable="true"][role="textbox"]',
    chatContainer: '#main',
    sendButton: 'button[aria-label*="Send"]'
  },
  
  telegram: {
    messageInput: 'div[contenteditable="true"].input-message-input',
    messageInputAlt: 'div.input-message-container textarea',
    chatContainer: '.chat',
    sendButton: 'button.send'
  },
  
  linkedin: {
    messageInput: 'div[contenteditable="true"][role="textbox"]',
    messageInputAlt: '.msg-form__contenteditable',
    chatContainer: '.msg-thread',
    sendButton: 'button[type="submit"]'
  }
};

export function detectPlatform() {
  const hostname = window.location.hostname;
  
  if (hostname.includes('whatsapp.com')) {
    return 'whatsapp';
  } else if (hostname.includes('telegram.org')) {
    return 'telegram';
  } else if (hostname.includes('linkedin.com')) {
    return 'linkedin';
  }
  
  return null;
}

export function getMessageInput(platform) {
  const selectors = SELECTORS[platform];
  if (!selectors) return null;

  // Try the primary selector first
  let input = document.querySelector(selectors.messageInput);
  
  // If not found, look for ANY contenteditable if it's WhatsApp
  if (!input && platform === 'whatsapp') {
    const editables = document.querySelectorAll('div[contenteditable="true"]');
    // The main message box usually has more siblings/children than just a simple box
    input = Array.from(editables).find(el => el.innerText.length >= 0);
  }
  
  return input;
}

export function getInputText(inputElement) {
  if (!inputElement) return '';
  
  if (inputElement.tagName === 'TEXTAREA' || inputElement.tagName === 'INPUT') {
    return inputElement.value;
  }
  
  return inputElement.innerText || inputElement.textContent || '';
}

export function setInputText(inputElement, text) {
  if (!inputElement) return false;
  
  if (inputElement.tagName === 'TEXTAREA' || inputElement.tagName === 'INPUT') {
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    inputElement.dispatchEvent(new Event('change', { bubbles: true }));
  } else {
    // For contenteditable divs
    inputElement.focus();
    
    // Select everything
    document.execCommand('selectAll', false, null);
    
    // Insert the text (replaces selection)
    // This command automatically clears the selection and inserts the new text
    const success = document.execCommand('insertText', false, text);
    
    // Fallback only if execCommand completely fails
    if (!success || inputElement.innerText.trim() === '') {
      inputElement.innerText = text;
    }

    // Fire a simple input event to notify WhatsApp/React to update the UI
    // We don't include the 'data' here to prevent double-insertion
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    inputElement.dispatchEvent(new Event('change', { bubbles: true }));
  }
  
  return true;
}
