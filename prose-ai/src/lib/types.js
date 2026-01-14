/**
 * Type Definitions and Constants for ProseAI
 * Provides JSDoc type annotations and shared constants across the application
 */

/**
 * Available tone options for text rewriting
 * @typedef {'professional' | 'friendly' | 'casual' | 'comedy' | 'polite' | 'confident'} ToneType
 */

/**
 * Supported AI providers
 * @typedef {'gemini' | 'openai' | 'claude'} AIProvider
 */

/**
 * AI rewrite request configuration
 * @typedef {Object} RewriteConfig
 * @property {string} text - The original text to rewrite
 * @property {ToneType} tone - The desired tone for rewriting
 * @property {AIProvider} [provider] - The AI provider to use (defaults to auto-detect)
 * @property {string} [apiKey] - Optional API key override
 */

/**
 * AI rewrite response
 * @typedef {Object} RewriteResponse
 * @property {boolean} success - Whether the rewrite was successful
 * @property {string} [rewrittenText] - The rewritten text (if successful)
 * @property {string} [error] - Error message (if failed)
 * @property {AIProvider} provider - The provider used
 */

/**
 * Extension storage data structure
 * @typedef {Object} ExtensionStorage
 * @property {boolean} onboardingCompleted - Whether user has completed onboarding
 * @property {string[]} selectedApps - Array of selected app identifiers
 * @property {ToneType} [lastUsedTone] - Last tone used by the user
 * @property {AIProvider} [preferredProvider] - User's preferred AI provider
 */

/**
 * Message from extension to API
 * @typedef {Object} ExtensionMessage
 * @property {string} type - Message type identifier
 * @property {string} text - Text to rewrite
 * @property {ToneType} tone - Desired tone
 * @property {string} [tabId] - Browser tab ID
 */

/**
 * API response to extension
 * @typedef {Object} APIResponse
 * @property {boolean} success - Whether the request was successful
 * @property {string} [rewrittenText] - The rewritten text
 * @property {string} [error] - Error message if failed
 * @property {number} timestamp - Response timestamp
 */

/**
 * Supported web applications
 */
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

/**
 * Tone configurations with metadata
 */
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

/**
 * AI Provider configurations
 */
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

/**
 * Extension message types
 */
export const MESSAGE_TYPES = {
  REWRITE_REQUEST: 'rewrite_request',
  REWRITE_RESPONSE: 'rewrite_response',
  ERROR: 'error',
  PING: 'ping',
  PONG: 'pong'
};

/**
 * Storage keys for chrome.storage
 */
export const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: 'onboardingCompleted',
  SELECTED_APPS: 'selectedApps',
  LAST_USED_TONE: 'lastUsedTone',
  PREFERRED_PROVIDER: 'preferredProvider',
  USER_PREFERENCES: 'userPreferences'
};

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  REWRITE: '/api/rewrite',
  HEALTH: '/api/health'
};

/**
 * Validation constants
 */
export const VALIDATION = {
  MIN_TEXT_LENGTH: 1,
  MAX_TEXT_LENGTH: 5000,
  MIN_ENGLISH_RATIO: 0.7
};

/**
 * Error messages
 */
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

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  TEXT_REWRITTEN: 'Text rewritten successfully',
  SETTINGS_SAVED: 'Settings saved successfully',
  ONBOARDING_COMPLETED: 'Setup completed successfully'
};

/**
 * UI Constants
 */
export const UI_CONSTANTS = {
  FLOATING_PANEL_ID: 'proseai-floating-panel',
  FLOATING_PANEL_CLASS: 'proseai-panel',
  TONE_BUTTON_CLASS: 'proseai-tone-btn',
  LOADING_CLASS: 'proseai-loading',
  ERROR_CLASS: 'proseai-error',
  SUCCESS_CLASS: 'proseai-success'
};

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION_DURATIONS = {
  FADE_IN: 200,
  FADE_OUT: 150,
  SLIDE_IN: 300,
  SLIDE_OUT: 250,
  BUTTON_HOVER: 100
};

/**
 * Z-index values for UI layers
 */
export const Z_INDEX = {
  FLOATING_PANEL: 999999,
  MODAL: 1000000,
  TOOLTIP: 1000001
};

/**
 * Validates a tone type
 * @param {string} tone - The tone to validate
 * @returns {boolean} True if valid
 */
export function isValidTone(tone) {
  return Object.keys(TONE_CONFIGS).includes(tone);
}

/**
 * Validates an AI provider
 * @param {string} provider - The provider to validate
 * @returns {boolean} True if valid
 */
export function isValidProvider(provider) {
  return Object.values(AI_PROVIDERS).some(p => p.id === provider);
}

/**
 * Validates text length
 * @param {string} text - The text to validate
 * @returns {boolean} True if valid
 */
export function isValidTextLength(text) {
  if (!text || typeof text !== 'string') return false;
  const length = text.trim().length;
  return length >= VALIDATION.MIN_TEXT_LENGTH && length <= VALIDATION.MAX_TEXT_LENGTH;
}

/**
 * Gets a tone config by ID
 * @param {ToneType} toneId - The tone ID
 * @returns {Object|null} The tone config or null
 */
export function getToneConfig(toneId) {
  return TONE_CONFIGS[toneId] || null;
}

/**
 * Gets all tone IDs
 * @returns {ToneType[]} Array of tone IDs
 */
export function getAllToneIds() {
  return Object.keys(TONE_CONFIGS);
}

/**
 * Gets a supported app by ID
 * @param {string} appId - The app ID
 * @returns {Object|null} The app config or null
 */
export function getSupportedApp(appId) {
  return Object.values(SUPPORTED_APPS).find(app => app.id === appId) || null;
}

/**
 * Checks if a URL matches a supported app
 * @param {string} url - The URL to check
 * @returns {Object|null} The matching app config or null
 */
export function getAppFromUrl(url) {
  if (!url) return null;
  
  for (const app of Object.values(SUPPORTED_APPS)) {
    if (url.includes(app.url)) {
      return app;
    }
  }
  
  return null;
}
