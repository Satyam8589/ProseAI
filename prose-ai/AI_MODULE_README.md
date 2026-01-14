# AI Service Module Documentation

## Overview

The `ai.js` module is the core AI integration layer for ProseAI. It handles text rewriting using multiple AI providers (Google Gemini, OpenAI, and Anthropic Claude) with sophisticated prompt engineering for different tones.

## Features

✅ **Multi-Provider Support**: Seamlessly switch between Gemini, OpenAI, and Claude  
✅ **6 Tone Presets**: Professional, Friendly, Casual, Comedy, Polite, Confident  
✅ **Auto-Detection**: Automatically selects available AI provider  
✅ **English Validation**: Ensures text is in English before processing  
✅ **Robust Error Handling**: Comprehensive error messages and fallbacks  
✅ **Type Safety**: Full JSDoc annotations for IntelliSense  

## Installation

The module is already integrated into the ProseAI project. No additional installation needed.

## Configuration

### 1. Set up API Keys

Add at least one API key to `.env.local`:

```bash
# Option 1: Google Gemini (Recommended - Free tier available)
GEMINI_API_KEY=your_gemini_api_key_here

# Option 2: OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Option 3: Anthropic Claude
CLAUDE_API_KEY=your_claude_api_key_here
```

### 2. Get API Keys

- **Gemini**: https://makersuite.google.com/app/apikey
- **OpenAI**: https://platform.openai.com/api-keys
- **Claude**: https://console.anthropic.com/

## Usage

### Basic Text Rewriting

```javascript
import { rewriteText } from '@/lib/ai';

const result = await rewriteText({
  text: "hey can u send me the report asap",
  tone: "professional"
});

if (result.success) {
  console.log(result.rewrittenText);
  // Output: "Could you please send me the report at your earliest convenience?"
} else {
  console.error(result.error);
}
```

### Specify AI Provider

```javascript
const result = await rewriteText({
  text: "thanks for your help!",
  tone: "professional",
  provider: "openai" // Force OpenAI
});
```

### Validate English Text

```javascript
import { isEnglishText } from '@/lib/ai';

console.log(isEnglishText("Hello world")); // true
console.log(isEnglishText("こんにちは")); // false
```

### Get Available Tones

```javascript
import { getAvailableTones, getToneDescription } from '@/lib/ai';

const tones = getAvailableTones();
// ['professional', 'friendly', 'casual', 'comedy', 'polite', 'confident']

tones.forEach(tone => {
  console.log(`${tone}: ${getToneDescription(tone)}`);
});
```

## Available Tones

| Tone | Description | Example Use Case |
|------|-------------|------------------|
| **Professional** | Formal and business-appropriate | Work emails, LinkedIn messages |
| **Friendly** | Warm and approachable | Casual work chats, networking |
| **Casual** | Relaxed and informal | Friends, informal groups |
| **Comedy** | Funny and witty | Light-hearted conversations |
| **Polite** | Courteous and respectful | Customer service, formal requests |
| **Confident** | Assertive and authoritative | Leadership messages, presentations |

## API Reference

### `rewriteText(config)`

Main function to rewrite text using AI.

**Parameters:**
- `config.text` (string, required): The text to rewrite
- `config.tone` (ToneType, required): The desired tone
- `config.provider` (AIProvider, optional): Specific AI provider to use
- `config.apiKey` (string, optional): Override API key

**Returns:** `Promise<RewriteResponse>`
```javascript
{
  success: boolean,
  rewrittenText?: string,
  error?: string,
  provider: AIProvider
}
```

### `isEnglishText(text)`

Validates if text is in English.

**Parameters:**
- `text` (string): Text to validate

**Returns:** `boolean`

### `getAvailableTones()`

Gets all available tone options.

**Returns:** `ToneType[]`

### `getToneDescription(tone)`

Gets the description for a specific tone.

**Parameters:**
- `tone` (ToneType): The tone to describe

**Returns:** `string`

## Error Handling

The module provides detailed error messages:

```javascript
const result = await rewriteText({
  text: "",
  tone: "professional"
});

if (!result.success) {
  console.error(result.error);
  // "Invalid input: text is required and must be a non-empty string"
}
```

Common errors:
- Invalid or empty text
- Invalid tone
- No API key configured
- API provider errors
- Network errors

## Testing

Run the test file to verify everything works:

```bash
node test-ai.js
```

This will test:
- Available tones
- English text detection
- Text rewriting with all tones
- Error handling

## Integration with API Route

The AI module is used by the Next.js API route at `/api/rewrite`:

```javascript
// POST /api/rewrite
{
  "text": "hey whats up",
  "tone": "professional"
}

// Response
{
  "success": true,
  "rewrittenText": "Hello, how are you?",
  "provider": "gemini",
  "timestamp": 1705234567890
}
```

## Performance

- **Gemini**: ~1-2 seconds per request
- **OpenAI**: ~1-3 seconds per request
- **Claude**: ~1-2 seconds per request

Response times may vary based on:
- Text length
- Network conditions
- API provider load

## Privacy & Security

🔒 **No Data Storage**: User text is never stored or logged  
🔒 **Direct API Calls**: Text is sent directly to AI providers  
🔒 **Secure Keys**: API keys stored in environment variables  
🔒 **HTTPS Only**: All API calls use secure HTTPS  

## Troubleshooting

### "No API key found" Error

**Solution**: Add at least one API key to `.env.local`

### "Invalid response format" Error

**Solution**: Check your API key is valid and has sufficient quota

### Slow Response Times

**Solution**: Try a different AI provider or check your network connection

### "Text must be in English" Error

**Solution**: Ensure your text contains primarily English characters

## Advanced Usage

### Custom Prompt Engineering

You can access and modify tone prompts:

```javascript
import { TONE_PROMPTS } from '@/lib/ai';

console.log(TONE_PROMPTS.professional);
// {
//   system: "You are a professional writing assistant...",
//   instruction: "Rewrite this text in a professional tone..."
// }
```

### Provider Fallback

The module automatically falls back to available providers:

1. Checks for Gemini API key
2. Falls back to OpenAI if Gemini unavailable
3. Falls back to Claude if OpenAI unavailable
4. Returns error if no keys available

## Best Practices

1. **Always validate input** before calling `rewriteText()`
2. **Handle errors gracefully** with user-friendly messages
3. **Use appropriate tones** for different contexts
4. **Test with real examples** before deploying
5. **Monitor API usage** to avoid quota limits
6. **Keep API keys secure** - never commit to version control

## Contributing

To add a new tone:

1. Add the tone to `TONE_PROMPTS` in `ai.js`
2. Add the tone config to `TONE_CONFIGS` in `types.js`
3. Update this documentation
4. Test thoroughly

## License

Part of the ProseAI project. See main LICENSE file.

---

**Last Updated**: January 14, 2026  
**Version**: 1.0.0  
**Maintainer**: ProseAI Team
