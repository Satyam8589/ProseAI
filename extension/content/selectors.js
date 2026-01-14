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
    
    // Clear existing content first
    inputElement.innerHTML = '';
    
    // Create a text node with the new text
    const textNode = document.createTextNode(text);
    inputElement.appendChild(textNode);
    
    // Alternative: Set innerText (more reliable for some platforms)
    inputElement.innerText = text;
    
    // Dispatch multiple events to ensure the platform detects the change
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    inputElement.dispatchEvent(new Event('change', { bubbles: true }));
    inputElement.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
    inputElement.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
    
    // Move cursor to end
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(inputElement);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  
  inputElement.focus();
  return true;
}
