const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://velora-template.framer.website/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const scrollTrack = [];
  for (let y = 0; y <= 1200; y += 150) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(100);
    const data = await page.evaluate((top) => {
      const img = document.querySelector('img');
      const container = img.closest('div[style*="scale"]') || img.parentElement.parentElement;
      const rect = img.getBoundingClientRect();
      const style = window.getComputedStyle(container);
      return {
        scrollY: top,
        imgWidth: Math.round(rect.width),
        imgHeight: Math.round(rect.height),
        imgTop: Math.round(rect.top),
        styleTransform: container.style.transform || style.transform
      };
    }, y);
    scrollTrack.push(data);
  }

  console.log(JSON.stringify(scrollTrack, null, 2));
  await browser.close();
}

main().catch(console.error);
