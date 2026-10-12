const { chromium } = require('playwright');
const path = require('path');
const ARTIFACT_DIR = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\67d4ba9b-f9be-4334-8eeb-a9dd9608d7f1';

async function testScroll() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

  // Test approach A: inner image scales on scroll inside overflow-hidden container
  // Test approach B: container itself scales from top-left
  // Let's capture at scrollY = 0, 200, 400
  console.log('Testing scroll behavior...');
  await browser.close();
}

testScroll().catch(console.error);
