const { chromium } = require('playwright');
const path = require('path');
const ARTIFACT_DIR = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\67d4ba9b-f9be-4334-8eeb-a9dd9608d7f1';

async function testScaleOptions() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

  // Option 1: Scale inner image
  await page.evaluate(() => {
    window.__setupOption1 = () => {
      const img = document.querySelector('#home img');
      img.style.transition = 'transform 0.1s linear';
      window.addEventListener('scroll', () => {
        const progress = Math.min(window.scrollY / 500, 1);
        const scale = 1 + progress * 0.15; // 1 to 1.15
        img.style.transform = `scale(${scale})`;
      });
    };
  });

  // Let's test Option 1 at scroll 0, 200, 400
  await page.evaluate(() => window.__setupOption1());
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'opt1_scroll_0.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(100);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'opt1_scroll_300.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  // Option 2: Scale outer container from top-left
  await page.evaluate(() => {
    const img = document.querySelector('#home img');
    img.style.transform = 'none';
    const box = img.parentElement;
    box.style.transformOrigin = 'top left';
    box.style.transition = 'transform 0.1s linear';
    window.addEventListener('scroll', () => {
      const progress = Math.min(window.scrollY / 500, 1);
      const scale = 1 + progress * 0.12;
      box.style.transform = `scale(${scale})`;
    });
  });

  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(100);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'opt2_scroll_300.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  // Option 3: Scale outer container from center or top-center
  await page.evaluate(() => {
    const img = document.querySelector('#home img');
    const box = img.parentElement;
    box.style.transformOrigin = 'center center';
    window.addEventListener('scroll', () => {
      const progress = Math.min(window.scrollY / 500, 1);
      const scale = 1 + progress * 0.12;
      box.style.transform = `scale(${scale})`;
    });
  });

  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(100);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'opt3_scroll_300.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  await browser.close();
  console.log('Scale options captured');
}

testScaleOptions().catch(console.error);
