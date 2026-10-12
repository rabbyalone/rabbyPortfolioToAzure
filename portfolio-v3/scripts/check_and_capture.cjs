const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');

const ARTIFACT_DIR = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\67d4ba9b-f9be-4334-8eeb-a9dd9608d7f1';

function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}/`, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function run() {
  let targetPort = null;
  for (const port of [5174, 5173, 5175, 3000]) {
    if (await checkPort(port)) {
      targetPort = port;
      break;
    }
  }

  if (!targetPort) {
    console.error('No running dev server found on ports 5174, 5173, 5175, 3000');
    process.exit(1);
  }

  console.log(`Found active server on port ${targetPort}`);
  const url = `http://localhost:${targetPort}/`;

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // allow animations to settle

  // 1. Full page desktop screenshot
  const desktopFull = path.join(ARTIFACT_DIR, 'velora_desktop_full.png');
  await page.screenshot({ path: desktopFull, fullPage: true });
  console.log(`Saved: ${desktopFull}`);

  // 2. Hero screenshot
  const heroEl = await page.$('#home');
  if (heroEl) {
    const heroShot = path.join(ARTIFACT_DIR, 'velora_hero.png');
    await heroEl.screenshot({ path: heroShot });
    console.log(`Saved: ${heroShot}`);
  }

  // 3. Works section screenshot
  const worksEl = await page.$('#works');
  if (worksEl) {
    const worksShot = path.join(ARTIFACT_DIR, 'velora_works.png');
    await worksEl.screenshot({ path: worksShot });
    console.log(`Saved: ${worksShot}`);
  }

  // 4. Services section screenshot
  const servicesEl = await page.$('#services');
  if (servicesEl) {
    const servicesShot = path.join(ARTIFACT_DIR, 'velora_services.png');
    await servicesEl.screenshot({ path: servicesShot });
    console.log(`Saved: ${servicesShot}`);
  }

  // 5. About section screenshot
  const aboutEl = await page.$('#about');
  if (aboutEl) {
    const aboutShot = path.join(ARTIFACT_DIR, 'velora_about.png');
    await aboutEl.screenshot({ path: aboutShot });
    console.log(`Saved: ${aboutShot}`);
  }

  // 6. Reviews section screenshot
  const reviewsEl = await page.$('#reviews');
  if (reviewsEl) {
    const reviewsShot = path.join(ARTIFACT_DIR, 'velora_reviews.png');
    await reviewsEl.screenshot({ path: reviewsShot });
    console.log(`Saved: ${reviewsShot}`);
  }

  // 7. Mobile Viewport (iPhone 14 style: 390x844)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(url, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1500);

  const mobileHero = path.join(ARTIFACT_DIR, 'velora_mobile_hero.png');
  const mobileHeroEl = await mobilePage.$('#home');
  if (mobileHeroEl) {
    await mobileHeroEl.screenshot({ path: mobileHero });
    console.log(`Saved: ${mobileHero}`);
  }

  await browser.close();

  console.log('Console Errors:', consoleErrors);
  console.log('Capture completed successfully!');
}

run().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
