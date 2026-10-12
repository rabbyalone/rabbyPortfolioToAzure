const { chromium } = require('playwright');
const path = require('path');
const ARTIFACT_DIR = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\67d4ba9b-f9be-4334-8eeb-a9dd9608d7f1';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const scrollTrack = [];

  // Scroll down
  for (const y of [0, 100, 200, 300, 450, 600]) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(100);
    const data = await page.evaluate((top) => {
      const img = document.querySelector('#home img');
      const container = img.parentElement;
      const rect = container.getBoundingClientRect();
      const style = window.getComputedStyle(container);
      return {
        scrollY: top,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        transform: style.transform
      };
    }, y);
    scrollTrack.push(data);
  }

  // Scroll back up to 0
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
  const backAtZero = await page.evaluate(() => {
    const img = document.querySelector('#home img');
    const container = img.parentElement;
    const rect = container.getBoundingClientRect();
    const style = window.getComputedStyle(container);
    return {
      scrollY: 0,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      transform: style.transform
    };
  });

  console.log('Scroll track (down):', scrollTrack);
  console.log('Scroll back up to 0:', backAtZero);

  // Take screenshot at scroll 0 and scroll 300
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'hero_scroll_y0.png') });

  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'hero_scroll_y300.png') });

  await browser.close();
}

main().catch(console.error);
