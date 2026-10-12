const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
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
  let localPort = null;
  for (const port of [5174, 5173, 5175, 3000]) {
    if (await checkPort(port)) {
      localPort = port;
      break;
    }
  }

  console.log(`Local dev server found on port: ${localPort}`);

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5
  });

  // 1. Capture Velora Live Template
  console.log('Capturing Velora live template (https://velora-template.framer.website/)...');
  const veloraPage = await context.newPage();
  try {
    await veloraPage.goto('https://velora-template.framer.website/', { waitUntil: 'networkidle', timeout: 30000 });
    await veloraPage.waitForTimeout(2500);

    // Full page
    await veloraPage.screenshot({
      path: path.join(ARTIFACT_DIR, 'live_velora_full.png'),
      fullPage: true
    });
    console.log('Saved: live_velora_full.png');

    // Viewport Hero
    await veloraPage.screenshot({
      path: path.join(ARTIFACT_DIR, 'live_velora_hero.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('Saved: live_velora_hero.png');
  } catch (e) {
    console.error('Error loading Velora live site:', e.message);
  }
  await veloraPage.close();

  // 2. Capture Local Portfolio-v3
  if (localPort) {
    console.log(`Capturing local portfolio-v3 (http://localhost:${localPort}/)...`);
    const localPage = await context.newPage();
    await localPage.goto(`http://localhost:${localPort}/`, { waitUntil: 'networkidle', timeout: 15000 });
    await localPage.waitForTimeout(2000);

    // Full page
    await localPage.screenshot({
      path: path.join(ARTIFACT_DIR, 'local_portfolio_full.png'),
      fullPage: true
    });
    console.log('Saved: local_portfolio_full.png');

    // Viewport Hero
    await localPage.screenshot({
      path: path.join(ARTIFACT_DIR, 'local_portfolio_hero.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('Saved: local_portfolio_hero.png');

    // Section Screenshots
    const sections = ['works', 'services', 'about', 'reviews', 'contact'];
    for (const sec of sections) {
      const el = await localPage.$(`#${sec}`);
      if (el) {
        await el.screenshot({
          path: path.join(ARTIFACT_DIR, `local_portfolio_${sec}.png`)
        });
        console.log(`Saved: local_portfolio_${sec}.png`);
      }
    }
    await localPage.close();
  }

  await browser.close();
  console.log('Comparison screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error during comparison script:', err);
  process.exit(1);
});
