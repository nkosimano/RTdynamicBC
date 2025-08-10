#!/usr/bin/env node

/**
 * Deployment Setup Script for RT Dynamics Business Consulting
 * This script helps configure the deployment environment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 RT Dynamics - Deployment Setup');
console.log('=====================================\n');

// Check if required files exist
const requiredFiles = [
  'netlify.toml',
  '.github/workflows/deploy.yml',
  'public/_redirects',
  'DEPLOYMENT.md'
];

console.log('📋 Checking deployment files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('\n🎉 All deployment files are ready!');
} else {
  console.log('\n⚠️  Some deployment files are missing. Please run the setup again.');
  process.exit(1);
}

// Check package.json scripts
console.log('\n📦 Checking build scripts...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (packageJson.scripts.build) {
  console.log('✅ Build script found');
} else {
  console.log('❌ Build script missing');
}

if (packageJson.scripts.preview) {
  console.log('✅ Preview script found');
} else {
  console.log('❌ Preview script missing');
}

console.log('\n📝 Next Steps:');
console.log('1. Push your code to GitHub');
console.log('2. Connect your repository to Netlify');
console.log('3. Add GitHub secrets (NETLIFY_AUTH_TOKEN, NETLIFY_SITE_ID)');
console.log('4. Your app will auto-deploy on every push!');
console.log('\n📖 For detailed instructions, see DEPLOYMENT.md');
console.log('\n🌐 Your Netlify URL: https://chimerical-kelpie-e8037b.netlify.app/');
console.log('\n✨ Happy deploying!');