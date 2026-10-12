const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\67d4ba9b-f9be-4334-8eeb-a9dd9608d7f1';

async function captureSite(url, prefix) {
  console.log(`Launching browser for ${prefix} (${url})...`);
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5
  });
  const page = await context.newPage();

  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Scroll smoothly down the entire page in increments to trigger all in-view animations
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`${prefix} total scroll height: ${scrollHeight}px`);

  for (let y = 0; y <= scrollHeight; y += 450) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(1500);

  // Return to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Capture full page with all animations resolved
  const fullShot = path.join(ARTIFACT_DIR, `${prefix}_revealed_full.png`);
  await page.screenshot({ path: fullShot, fullPage: true });
  console.log(`Saved: ${fullShot}`);

  // Now capture individual viewports at key scroll positions
  // 1. Hero
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, `${prefix}_view_01_hero.png`) });

  // 2. Selected Works
  const worksSelector = prefix === 'velora' ? 'text="Selected Works"' : '#works';
  try {
    const el = await page.$(worksSelector);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, `${prefix}_view_02_works.png`) });
    }
  } catch (e) {
    console.error(`Could not scroll to works in ${prefix}:`, e.message);
  }

  // 3. Services
  const servicesSelector = prefix === 'velora' ? 'text="Services"' : '#services';
  try {
    const el = await page.$(servicesSelector);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, `${prefix}_view_03_services.png`) });
    }
  } catch (e) {
    console.error(`Could not scroll to services in ${prefix}:`, e.message);
  }

  // 4. About
  const aboutSelector = prefix === 'velora' ? 'text="About"' : '#about';
  try {
    const el = await page.$(aboutSelector);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, `${prefix}_view_04_about.png`) });
    }
  } catch (e) {
    console.error(`Could not scroll to about in ${prefix}:`, e.message);
  }

  // 5. Reviews
  const reviewsSelector = prefix === 'velora' ? 'text="What People Say"' : '#reviews';
  try {
    const el = await page.$(reviewsSelector);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, `${prefix}_view_05_reviews.png`) });
    }
  } catch (e) {
    console.error(`Could not scroll to reviews in ${prefix}:`, e.message);
  }

  // 6. Bottom / Stay connected / Footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, `${prefix}_view_06_bottom.png`) });

  await browser.close();
}

async function main() {
  await captureSite('https://velora-template.framer.website/', 'velora');
  await captureSite('http://localhost:5174/', 'local');
  console.log('ALL SCREENSHOTS CAPTURED!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
