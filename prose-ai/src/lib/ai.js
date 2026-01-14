/**
 * AI Service Module
 * Handles AI prompt engineering and API integration for text rewriting
 * Supports multiple AI providers: Google Gemini, OpenAI, and Anthropic Claude
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
 * @property {AIProvider} [provider] - The AI provider to use (defaults to Gemini)
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
 * Tone-specific prompt templates
 * Each tone has a carefully crafted system prompt to guide the AI
 */
const TONE_PROMPTS = {
  professional: {
    system: "You are a professional writing assistant. Rewrite the given text in a formal, business-appropriate tone. Maintain clarity, use proper grammar, and ensure the message is polished and suitable for professional communication.",
    instruction: "Rewrite this text in a professional, formal tone suitable for business communication:"
  },
  friendly: {
    system: "You are a friendly writing assistant. Rewrite the given text in a warm, approachable, and friendly tone. Use conversational language while maintaining respect and positivity.",
    instruction: "Rewrite this text in a friendly, warm, and approachable tone:"
  },
  casual: {
    system: "You are a casual writing assistant. Rewrite the given text in a relaxed, informal tone. Use everyday language, contractions, and a laid-back style while keeping the message clear.",
    instruction: "Rewrite this text in a casual, relaxed, and informal tone:"
  },
  comedy: {
    system: "You are a humorous writing assistant. Rewrite the given text with wit, humor, and playfulness. Add light-hearted jokes or clever wordplay while preserving the core message.",
    instruction: "Rewrite this text in a funny, witty, and humorous tone:"
  },
  polite: {
    system: "You are a polite writing assistant. Rewrite the given text with utmost courtesy, respect, and consideration. Use please, thank you, and other polite expressions appropriately.",
    instruction: "Rewrite this text in a very polite, courteous, and respectful tone:"
  },
  confident: {
    system: "You are a confident writing assistant. Rewrite the given text with assertiveness, conviction, and authority. Use strong, decisive language that conveys confidence and leadership.",
    instruction: "Rewrite this text in a confident, assertive, and authoritative tone:"
  }
};

/**
 * Generates a complete prompt for the AI based on tone and text
 * @param {string} text - The original text to rewrite
 * @param {ToneType} tone - The desired tone
 * @returns {Object} Prompt configuration with system and user messages
 */
function generatePrompt(text, tone) {
  const toneConfig = TONE_PROMPTS[tone] || TONE_PROMPTS.professional;
  
  return {
    system: toneConfig.system,
    user: `${toneConfig.instruction}\n\n"${text}"\n\nProvide ONLY the rewritten text without any explanations, quotes, or additional commentary.`
  };
}

/**
 * Calls Google Gemini API for text rewriting
 * @param {string} text - The original text
 * @param {ToneType} tone - The desired tone
 * @param {string} apiKey - Gemini API key
 * @returns {Promise<string>} The rewritten text
 */
async function callGeminiAPI(text, tone, apiKey) {
  const prompt = generatePrompt(text, tone);
  // Use gemini-2.5-flash which is the latest fast model
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const requestBody = {
    contents: [{
      parts: [{
        text: `${prompt.system}\n\n${prompt.user}`
      }]
    }],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_NONE"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_NONE"
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_NONE"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_NONE"
      }
    ]
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(`Gemini API failed: ${error.message}`);
  }
}

/**
 * Calls OpenAI API for text rewriting
 * @param {string} text - The original text
 * @param {ToneType} tone - The desired tone
 * @param {string} apiKey - OpenAI API key
 * @returns {Promise<string>} The rewritten text
 */
async function callOpenAIAPI(text, tone, apiKey) {
  const prompt = generatePrompt(text, tone);
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  
  const requestBody = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: prompt.system },
      { role: 'user', content: prompt.user }
    ],
    temperature: 0.7,
    max_tokens: 500
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error('Invalid response format from OpenAI API');
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(`OpenAI API failed: ${error.message}`);
  }
}

/**
 * Calls Anthropic Claude API for text rewriting
 * @param {string} text - The original text
 * @param {ToneType} tone - The desired tone
 * @param {string} apiKey - Claude API key
 * @returns {Promise<string>} The rewritten text
 */
async function callClaudeAPI(text, tone, apiKey) {
  const prompt = generatePrompt(text, tone);
  const apiUrl = 'https://api.anthropic.com/v1/messages';
  
  const requestBody = {
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `${prompt.system}\n\n${prompt.user}`
      }
    ]
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Claude API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.content || !data.content[0]?.text) {
      throw new Error('Invalid response format from Claude API');
    }

    return data.content[0].text.trim();
  } catch (error) {
    console.error('Claude API Error:', error);
    throw new Error(`Claude API failed: ${error.message}`);
  }
}

/**
 * Main function to rewrite text using AI
 * Automatically selects the appropriate AI provider based on available API keys
 * 
 * @param {RewriteConfig} config - Configuration for the rewrite request
 * @returns {Promise<RewriteResponse>} The rewrite response
 */
export async function rewriteText({ text, tone, provider, apiKey }) {
  // Validation
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return {
      success: false,
      error: 'Invalid input: text is required and must be a non-empty string',
      provider: provider || 'none'
    };
  }

  if (!tone || !TONE_PROMPTS[tone]) {
    return {
      success: false,
      error: `Invalid tone: must be one of ${Object.keys(TONE_PROMPTS).join(', ')}`,
      provider: provider || 'none'
    };
  }

  // Determine which provider to use
  let selectedProvider = provider;
  let selectedApiKey = apiKey;

  if (!selectedProvider || !selectedApiKey) {
    // Auto-detect provider based on environment variables
    if (process.env.GEMINI_API_KEY) {
      selectedProvider = 'gemini';
      selectedApiKey = process.env.GEMINI_API_KEY;
    } else if (process.env.OPENAI_API_KEY) {
      selectedProvider = 'openai';
      selectedApiKey = process.env.OPENAI_API_KEY;
    } else if (process.env.CLAUDE_API_KEY) {
      selectedProvider = 'claude';
      selectedApiKey = process.env.CLAUDE_API_KEY;
    } else {
      return {
        success: false,
        error: 'No API key found. Please set GEMINI_API_KEY, OPENAI_API_KEY, or CLAUDE_API_KEY in your environment variables.',
        provider: 'none'
      };
    }
  }

  // Call the appropriate AI provider
  try {
    let rewrittenText;

    switch (selectedProvider) {
      case 'gemini':
        rewrittenText = await callGeminiAPI(text, tone, selectedApiKey);
        break;
      case 'openai':
        rewrittenText = await callOpenAIAPI(text, tone, selectedApiKey);
        break;
      case 'claude':
        rewrittenText = await callClaudeAPI(text, tone, selectedApiKey);
        break;
      default:
        return {
          success: false,
          error: `Unsupported provider: ${selectedProvider}. Use 'gemini', 'openai', or 'claude'.`,
          provider: selectedProvider
        };
    }

    return {
      success: true,
      rewrittenText,
      provider: selectedProvider
    };
  } catch (error) {
    console.error(`AI Rewrite Error (${selectedProvider}):`, error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during text rewriting',
      provider: selectedProvider
    };
  }
}

/**
 * Validates if the given text is in English
 * Simple heuristic-based validation
 * 
 * @param {string} text - The text to validate
 * @returns {boolean} True if text appears to be in English
 */
export function isEnglishText(text) {
  if (!text || typeof text !== 'string') {
    return false;
  }

  // Check if text contains mostly Latin characters
  const latinCharacters = text.match(/[a-zA-Z]/g);
  if (!latinCharacters) {
    return false;
  }

  // At least 70% of characters should be Latin alphabet
  const latinRatio = latinCharacters.length / text.replace(/\s/g, '').length;
  return latinRatio >= 0.7;
}

/**
 * Gets all available tone options
 * @returns {ToneType[]} Array of available tones
 */
export function getAvailableTones() {
  return Object.keys(TONE_PROMPTS);
}

/**
 * Gets the description for a specific tone
 * @param {ToneType} tone - The tone to get description for
 * @returns {string} The tone description
 */
export function getToneDescription(tone) {
  const descriptions = {
    professional: 'Formal and business-appropriate',
    friendly: 'Warm and approachable',
    casual: 'Relaxed and informal',
    comedy: 'Funny and witty',
    polite: 'Courteous and respectful',
    confident: 'Assertive and authoritative'
  };
  
  return descriptions[tone] || 'Unknown tone';
}

// Export tone prompts for testing or customization
export { TONE_PROMPTS };
