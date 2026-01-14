export const SUPPORTED_APPS = {
  WHATSAPP: {
    id: 'whatsapp',
    name: 'WhatsApp Web',
    url: 'https://web.whatsapp.com',
    urlPattern: '*://web.whatsapp.com/*',
    icon: '💬'
  },
  TELEGRAM: {
    id: 'telegram',
    name: 'Telegram Web',
    url: 'https://web.telegram.org',
    urlPattern: '*://web.telegram.org/*',
    icon: '✈️'
  },
  LINKEDIN: {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com',
    urlPattern: '*://*.linkedin.com/*',
    icon: '💼'
  }
};

export const TONE_CONFIGS = {
  professional: {
    id: 'professional',
    label: 'Professional',
    description: 'Formal and business-appropriate',
    icon: '💼',
    color: '#2563eb'
  },
  friendly: {
    id: 'friendly',
    label: 'Friendly',
    description: 'Warm and approachable',
    icon: '😊',
    color: '#10b981'
  },
  casual: {
    id: 'casual',
    label: 'Casual',
    description: 'Relaxed and informal',
    icon: '😎',
    color: '#f59e0b'
  },
  comedy: {
    id: 'comedy',
    label: 'Comedy',
    description: 'Funny and witty',
    icon: '😂',
    color: '#ec4899'
  },
  polite: {
    id: 'polite',
    label: 'Polite',
    description: 'Courteous and respectful',
    icon: '🙏',
    color: '#8b5cf6'
  },
  confident: {
    id: 'confident',
    label: 'Confident',
    description: 'Assertive and authoritative',
    icon: '💪',
    color: '#ef4444'
  }
};

export const AI_PROVIDERS = {
  GEMINI: {
    id: 'gemini',
    name: 'Google Gemini',
    model: 'gemini-pro',
    envKey: 'GEMINI_API_KEY'
  },
  OPENAI: {
    id: 'openai',
    name: 'OpenAI GPT',
    model: 'gpt-3.5-turbo',
    envKey: 'OPENAI_API_KEY'
  },
  CLAUDE: {
    id: 'claude',
    name: 'Anthropic Claude',
    model: 'claude-3-haiku-20240307',
    envKey: 'CLAUDE_API_KEY'
  }
};

export const MESSAGE_TYPES = {
  REWRITE_REQUEST: 'rewrite_request',
  REWRITE_RESPONSE: 'rewrite_response',
  ERROR: 'error',
  PING: 'ping',
  PONG: 'pong'
};

export const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: 'onboardingCompleted',
  SELECTED_APPS: 'selectedApps',
  LAST_USED_TONE: 'lastUsedTone',
  PREFERRED_PROVIDER: 'preferredProvider',
  USER_PREFERENCES: 'userPreferences'
};

export const API_ENDPOINTS = {
  REWRITE: '/api/rewrite',
  HEALTH: '/api/health'
};

export const VALIDATION = {
  MIN_TEXT_LENGTH: 1,
  MAX_TEXT_LENGTH: 5000,
  MIN_ENGLISH_RATIO: 0.7
};

export const ERROR_MESSAGES = {
  NO_TEXT: 'Please enter some text to rewrite',
  TEXT_TOO_SHORT: 'Text is too short to rewrite',
  TEXT_TOO_LONG: `Text is too long (max ${VALIDATION.MAX_TEXT_LENGTH} characters)`,
  NOT_ENGLISH: 'Text must be in English',
  NO_API_KEY: 'No API key configured. Please check your environment variables.',
  INVALID_TONE: 'Invalid tone selected',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  API_ERROR: 'AI service error. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred'
};

export const SUCCESS_MESSAGES = {
  TEXT_REWRITTEN: 'Text rewritten successfully',
  SETTINGS_SAVED: 'Settings saved successfully',
  ONBOARDING_COMPLETED: 'Setup completed successfully'
};

export const UI_CONSTANTS = {
  FLOATING_PANEL_ID: 'proseai-floating-panel',
  FLOATING_PANEL_CLASS: 'proseai-panel',
  TONE_BUTTON_CLASS: 'proseai-tone-btn',
  LOADING_CLASS: 'proseai-loading',
  ERROR_CLASS: 'proseai-error',
  SUCCESS_CLASS: 'proseai-success'
};

export const ANIMATION_DURATIONS = {
  FADE_IN: 200,
  FADE_OUT: 150,
  SLIDE_IN: 300,
  SLIDE_OUT: 250,
  BUTTON_HOVER: 100
};

export const Z_INDEX = {
  FLOATING_PANEL: 999999,
  MODAL: 1000000,
  TOOLTIP: 1000001
};

export function isValidTone(tone) {
  return Object.keys(TONE_CONFIGS).includes(tone);
}

export function isValidProvider(provider) {
  return Object.values(AI_PROVIDERS).some(p => p.id === provider);
}

export function isValidTextLength(text) {
  if (!text || typeof text !== 'string') return false;
  const length = text.trim().length;
  return length >= VALIDATION.MIN_TEXT_LENGTH && length <= VALIDATION.MAX_TEXT_LENGTH;
}

export function getToneConfig(toneId) {
  return TONE_CONFIGS[toneId] || null;
}

export function getAllToneIds() {
  return Object.keys(TONE_CONFIGS);
}

export function getSupportedApp(appId) {
  return Object.values(SUPPORTED_APPS).find(app => app.id === appId) || null;
}

export function getAppFromUrl(url) {
  if (!url) return null;
  
  for (const app of Object.values(SUPPORTED_APPS)) {
    if (url.includes(app.url)) {
      return app;
    }
  }
  
  return null;
}
