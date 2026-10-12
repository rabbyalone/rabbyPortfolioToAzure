const { chromium } = require('playwright');
const path = require('path');
const ARTIFACT_DIR = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\67d4ba9b-f9be-4334-8eeb-a9dd9608d7f1';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  for (const h of [650, 700, 768, 800, 900, 1080]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: h } });
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
    const metrics = await page.evaluate(() => {
      const hero = document.querySelector('#home');
      const works = document.querySelector('#works');
      const h1 = document.querySelector('h1');
      const scrollMore = document.querySelector('a[href="#works"]');
      return {
        heroBottom: Math.round(hero.getBoundingClientRect().bottom + window.scrollY),
        worksTop: Math.round(works.getBoundingClientRect().top + window.scrollY),
        h1Bottom: Math.round(h1.getBoundingClientRect().bottom + window.scrollY),
        scrollMoreBottom: scrollMore ? Math.round(scrollMore.getBoundingClientRect().bottom + window.scrollY) : null
      };
    });
    const gap = metrics.worksTop - Math.max(metrics.h1Bottom, metrics.scrollMoreBottom || 0);
    console.log(`Height ${h}:`, metrics, `Gap before works: ${gap}px`);
    if (h === 768 || h === 900) {
      await page.screenshot({ path: path.join(ARTIFACT_DIR, `fix_check_${h}.png`), fullPage: false });
    }
    await page.close();
  }
  await browser.close();
}

main().catch(console.error);
