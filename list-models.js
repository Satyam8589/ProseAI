// List available Gemini models
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const API_KEY = process.env.GEMINI_API_KEY;

console.log('🔍 Checking available Gemini models...\n');

if (!API_KEY) {
  console.log('❌ No API key found');
  process.exit(1);
}

// Try to list models
const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

try {
  const response = await fetch(listUrl);
  const data = await response.json();
  
  if (response.ok && data.models) {
    console.log(`✅ Found ${data.models.length} available models:\n`);
    
    data.models.forEach((model, index) => {
      console.log(`${index + 1}. ${model.name}`);
      if (model.supportedGenerationMethods) {
        console.log(`   Methods: ${model.supportedGenerationMethods.join(', ')}`);
      }
      console.log('');
    });
    
    // Find models that support generateContent
    const contentModels = data.models.filter(m => 
      m.supportedGenerationMethods?.includes('generateContent')
    );
    
    if (contentModels.length > 0) {
      console.log('\n✨ Models that support generateContent:');
      contentModels.forEach(m => {
        console.log(`   - ${m.name}`);
      });
    }
  } else {
    console.log('❌ Error listing models:');
    console.log(JSON.stringify(data, null, 2));
  }
} catch (error) {
  console.log('❌ Error:', error.message);
}
