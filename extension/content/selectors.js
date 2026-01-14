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

  let input = document.querySelector(selectors.messageInput);
  
  if (!input && selectors.messageInputAlt) {
    input = document.querySelector(selectors.messageInputAlt);
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
    // For contenteditable divs (WhatsApp, LinkedIn, etc.)
    
    // Focus first
    inputElement.focus();
    
    // Method 1: Select all and delete
    document.execCommand('selectAll', false, null);
    document.execCommand('delete', false, null);
    
    // Method 2: Clear innerHTML
    inputElement.innerHTML = '';
    
    // Method 3: Insert the new text
    document.execCommand('insertText', false, text);
    
    // Fallback: Direct manipulation
    if (inputElement.innerText !== text) {
      inputElement.innerText = text;
    }
    
    // Dispatch events
    inputElement.dispatchEvent(new InputEvent('input', { 
      bubbles: true, 
      cancelable: true,
      inputType: 'insertText',
      data: text 
    }));
    
    inputElement.dispatchEvent(new Event('change', { bubbles: true }));
    inputElement.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
    
    // Move cursor to end
    try {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(inputElement);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (e) {
      console.log('ProseAI: Could not set cursor position', e);
    }
  }
  
  inputElement.focus();
  return true;
}
