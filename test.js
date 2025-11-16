#!/usr/bin/env node

/**
 * Archie Test Suite
 * Validates that your setup is working correctly
 */

require('dotenv').config();
const http = require('http');

console.log('\n🧪 Archie Test Suite');
console.log('==========================================\n');

// Test 1: Check .env file exists
console.log('Test 1: Checking .env file...');
try {
  require('fs').accessSync('.env');
  console.log('✅ .env file exists\n');
} catch (e) {
  console.log('❌ .env file not found');
  console.log('   Run: ./setup.sh to create it\n');
  process.exit(1);
}

// Test 2: Check API keys
console.log('Test 2: Checking API keys...');
const hasOpenAI = !!process.env.OPENAI_API_KEY;
const hasClaude = !!process.env.ANTHROPIC_API_KEY;

if (!hasOpenAI && !hasClaude) {
  console.log('❌ No API keys configured');
  console.log('   Run: ./setup.sh to add API keys\n');
  process.exit(1);
}

if (hasOpenAI) {
  console.log(`✅ OpenAI key configured (${process.env.OPENAI_API_KEY.substring(0, 10)}...)`);
}
if (hasClaude) {
  console.log(`✅ Claude key configured (${process.env.ANTHROPIC_API_KEY.substring(0, 10)}...)`);
}

if (hasOpenAI && hasClaude) {
  console.log('🎉 Both providers configured - Parallel comparison mode enabled!');
}
console.log('');

// Test 3: Check dependencies
console.log('Test 3: Checking dependencies...');
try {
  require('express');
  require('cors');
  require('dotenv');
  if (hasOpenAI) require('openai');
  if (hasClaude) require('@anthropic-ai/sdk');
  console.log('✅ All dependencies installed\n');
} catch (e) {
  console.log('❌ Missing dependencies');
  console.log(`   Error: ${e.message}`);
  console.log('   Run: npm install\n');
  process.exit(1);
}

// Test 4: Check server can start
console.log('Test 4: Testing server startup...');
const port = process.env.PORT || 3000;

// Start server temporarily for testing
let server;
try {
  server = require('./server.js');

  // Give it a moment to start
  setTimeout(async () => {
    // Test 5: Health check
    console.log('\nTest 5: Testing /api/health endpoint...');

    http.get(`http://localhost:${port}/api/health`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const health = JSON.parse(data);

          if (health.status === 'ok') {
            console.log('✅ Health check passed');
            console.log(`   Mode: ${health.mode}`);
            console.log(`   OpenAI: ${health.providers.openai}`);
            console.log(`   Claude: ${health.providers.claude}`);

            console.log('\n==========================================');
            console.log('✅ ALL TESTS PASSED!');
            console.log('==========================================\n');
            console.log('Your Archie setup is working correctly!');
            console.log('');
            console.log('To start using Archie:');
            console.log('  1. Stop this test (Ctrl+C)');
            console.log('  2. Run: npm start');
            console.log(`  3. Open: http://localhost:${port}`);
            console.log('');

            process.exit(0);
          } else {
            throw new Error('Health check failed');
          }
        } catch (e) {
          console.log('❌ Health check failed');
          console.log(`   Error: ${e.message}\n`);
          process.exit(1);
        }
      });
    }).on('error', (e) => {
      console.log('❌ Could not connect to server');
      console.log(`   Error: ${e.message}`);
      console.log('   Make sure no other instance is running\n');
      process.exit(1);
    });
  }, 2000); // Wait 2 seconds for server to start

} catch (e) {
  console.log('❌ Server startup failed');
  console.log(`   Error: ${e.message}\n`);
  process.exit(1);
}
