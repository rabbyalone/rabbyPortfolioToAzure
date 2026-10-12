const { chromium } = require('playwright');
async function test() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('https://velora-template.framer.website/', { waitUntil: 'networkidle' });
  const els = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h1, h2, h3, img')).map(el => ({
      tag: el.tagName,
      text: el.textContent?.trim().slice(0, 30),
      src: el.src ? 'has-img' : undefined,
      y: Math.round(el.getBoundingClientRect().y)
    }));
  });
  console.log(JSON.stringify(els.slice(0, 10), null, 2));
  await browser.close();
}
test().catch(console.error);
