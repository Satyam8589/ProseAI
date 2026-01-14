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
    inputElement.focus();
    
    // Select everything accurately
    const range = document.createRange();
    range.selectNodeContents(inputElement);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Insert new text (this automatically replaces the selection)
    const inserted = document.execCommand('insertText', false, text);
    
    // If execCommand failed, use direct manipulation as a silent fallback
    if (!inserted || inputElement.innerText.trim() !== text.trim()) {
      inputElement.innerText = text;
    }
    
    // Dispatch events once
    inputElement.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true }));
    inputElement.dispatchEvent(new Event('change', { bubbles: true }));
    
    // Move cursor to the end
    const finalRange = document.createRange();
    finalRange.selectNodeContents(inputElement);
    finalRange.collapse(false);
    selection.removeAllRanges();
    selection.addRange(finalRange);
  }
  
  return true;
}
