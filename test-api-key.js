// Simple test to check if Gemini API key is valid
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const API_KEY = process.env.GEMINI_API_KEY;

console.log('🔑 Testing Gemini API Key...\n');
console.log(`API Key: ${API_KEY ? API_KEY.substring(0, 20) + '...' : 'NOT FOUND'}\n`);

if (!API_KEY) {
  console.log('❌ No API key found in .env.local');
  process.exit(1);
}

// Test with a simple request
const testUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const testBody = {
  contents: [{
    parts: [{
      text: "Say hello"
    }]
  }]
};

console.log('📡 Sending test request to Gemini API...\n');

try {
  const response = await fetch(testUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testBody)
  });

  console.log(`Status: ${response.status} ${response.statusText}\n`);

  const data = await response.json();
  
  if (response.ok) {
    console.log('✅ API Key is VALID!');
    console.log('\nResponse:', JSON.stringify(data, null, 2));
  } else {
    console.log('❌ API Error:');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.error?.message) {
      console.log('\n💡 Suggestion:');
      if (data.error.message.includes('API key not valid')) {
        console.log('- Your API key might be invalid or expired');
        console.log('- Get a new key from: https://makersuite.google.com/app/apikey');
      } else if (data.error.message.includes('not found')) {
        console.log('- The model name might be incorrect or not available for your API key');
        console.log('- Try enabling the Generative Language API in Google Cloud Console');
      }
    }
  }
} catch (error) {
  console.log('❌ Network Error:', error.message);
}
