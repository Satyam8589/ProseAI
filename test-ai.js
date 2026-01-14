/**
 * Test file for AI service
 * Run this to verify the AI integration is working
 * 
 * Usage: node test-ai.js
 */

// Load environment variables from .env.local
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { rewriteText, isEnglishText, getAvailableTones, getToneDescription } from './src/lib/ai.js';

// Test configuration
const TEST_TEXT = "hey can u send me the report asap";
const TEST_TONE = "professional";

async function runTests() {
  console.log('🧪 ProseAI - AI Service Tests\n');
  console.log('=' .repeat(50));
  
  // Test 1: Check available tones
  console.log('\n📋 Test 1: Available Tones');
  const tones = getAvailableTones();
  console.log('Available tones:', tones);
  tones.forEach(tone => {
    console.log(`  - ${tone}: ${getToneDescription(tone)}`);
  });
  
  // Test 2: English text detection
  console.log('\n🔍 Test 2: English Text Detection');
  console.log(`Text: "${TEST_TEXT}"`);
  console.log(`Is English: ${isEnglishText(TEST_TEXT)}`);
  console.log(`Non-English test: ${isEnglishText('こんにちは')}`);
  
  // Test 3: Text rewriting
  console.log('\n✨ Test 3: Text Rewriting');
  console.log(`Original: "${TEST_TEXT}"`);
  console.log(`Tone: ${TEST_TONE}`);
  console.log('Rewriting...\n');
  
  const result = await rewriteText({
    text: TEST_TEXT,
    tone: TEST_TONE
  });
  
  if (result.success) {
    console.log('✅ Success!');
    console.log(`Provider: ${result.provider}`);
    console.log(`Rewritten: "${result.rewrittenText}"`);
  } else {
    console.log('❌ Failed!');
    console.log(`Error: ${result.error}`);
  }
  
  // Test 4: Test all tones
  console.log('\n🎨 Test 4: Testing All Tones');
  console.log(`Original: "${TEST_TEXT}"\n`);
  
  for (const tone of tones) {
    console.log(`\n${tone.toUpperCase()}:`);
    const result = await rewriteText({
      text: TEST_TEXT,
      tone: tone
    });
    
    if (result.success) {
      console.log(`✅ "${result.rewrittenText}"`);
    } else {
      console.log(`❌ Error: ${result.error}`);
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('✅ Tests completed!\n');
}

// Run tests
runTests().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
