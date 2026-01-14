# ⚠️ Gemini API Key Issue - How to Fix

## Problem
Your Gemini API key is valid but doesn't have access to any models. This happens when:
- The API key is from an old Google AI Studio account
- The Generative Language API isn't enabled in Google Cloud Console
- The API key has restrictions or quotas

## ✅ Solution: Get a New API Key

### Option 1: Google AI Studio (Recommended - Easiest)

1. **Visit Google AI Studio**  
   Go to: https://aistudio.google.com/app/apikey

2. **Create API Key**  
   - Click "Get API Key" or "Create API Key"
   - Select "Create API key in new project" (recommended)
   - Copy the new API key

3. **Update `.env.local`**  
   Replace the old key with the new one:
   ```bash
   GEMINI_API_KEY=your_new_api_key_here
   ```

4. **Test Again**  
   ```bash
   node test-api-key.js
   ```

### Option 2: Google Cloud Console (Advanced)

1. **Go to Google Cloud Console**  
   https://console.cloud.google.com/

2. **Enable the API**  
   - Navigate to "APIs & Services" > "Library"
   - Search for "Generative Language API"
   - Click "Enable"

3. **Create Credentials**  
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key

4. **Update `.env.local`**  
   ```bash
   GEMINI_API_KEY=your_new_api_key_here
   ```

## 🔄 Alternative: Use OpenAI Instead

If you have trouble with Gemini, you can use OpenAI:

1. **Get OpenAI API Key**  
   https://platform.openai.com/api-keys

2. **Update `.env.local`**  
   ```bash
   # Comment out or remove Gemini key
   # GEMINI_API_KEY=...
   
   # Add OpenAI key
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Test Again**  
   The system will automatically use OpenAI instead of Gemini

## 📝 Current Status

Your current API key: `AIzaSyAin42JzTfgBTlK...`

**Error**: `models/gemini-pro is not found for API version v1beta`

This means the API key doesn't have access to any Gemini models.

## 🆘 Still Having Issues?

1. **Check API Key Validity**  
   Make sure you copied the entire API key (no spaces or line breaks)

2. **Check Quotas**  
   Visit: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas

3. **Try a Different Model**  
   Some API keys only have access to specific models

4. **Contact Support**  
   If nothing works, contact Google AI Studio support

---

**Recommendation**: Get a fresh API key from https://aistudio.google.com/app/apikey - this is the easiest solution!
