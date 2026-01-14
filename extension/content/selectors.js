export const SELECTORS = {
  whatsapp: {
    messageInput: 'div[contenteditable="true"][role="textbox"]',
    messageInputAlt: 'div[contenteditable="true"]',
    chatContainer: '#main, [role="main"]',
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
  
  console.log('ProseAI: Attempting to set text...');

  // Always copy to clipboard as a fallback
  try {
    navigator.clipboard.writeText(text).then(() => {
      console.log('ProseAI: Text also copied to clipboard (Ctrl+V ready)');
    });
  } catch (e) {
    console.warn('ProseAI: Clipboard copy failed', e);
  }

  if (inputElement.tagName === 'TEXTAREA' || inputElement.tagName === 'INPUT') {
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    inputElement.dispatchEvent(new Event('change', { bubbles: true }));
  } else {
    inputElement.focus();
    
    // Select all
    document.execCommand('selectAll', false, null);
    
    // Fire beforeinput
    inputElement.dispatchEvent(new InputEvent('beforeinput', {
      bubbles: true,
      cancelable: true,
      inputType: 'insertText',
      data: text
    }));

    // Insert text
    const success = document.execCommand('insertText', false, text);
    
    // Fallback if execCommand fails
    if (!success) {
      inputElement.innerText = text;
    }

    // Fire input event
    inputElement.dispatchEvent(new InputEvent('input', {
      bubbles: true,
      cancelable: true,
      inputType: 'insertText',
      data: text
    }));
    
    inputElement.dispatchEvent(new Event('change', { bubbles: true }));
  }
  
  return true;
}
