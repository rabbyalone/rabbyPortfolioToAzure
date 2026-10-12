const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://velora-template.framer.website/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const scrollTrack = [];
  for (let y = 0; y <= 600; y += 100) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(100);
    const data = await page.evaluate((top) => {
      const img = document.querySelector('img');
      let current = img;
      const chain = [];
      while (current && current !== document.body) {
        if (current.style && (current.style.transform || current.style.scale || current.style.width || current.style.height)) {
          chain.push({
            tag: current.tagName,
            styleTransform: current.style.transform,
            inlineWidth: current.style.width,
            inlineHeight: current.style.height
          });
        }
        current = current.parentElement;
      }
      const rect = img.getBoundingClientRect();
      return {
        scrollY: top,
        imgWidth: Math.round(rect.width),
        imgHeight: Math.round(rect.height),
        imgTop: Math.round(rect.top),
        imgAbsoluteTop: Math.round(rect.top + window.scrollY),
        chain
      };
    }, y);
    scrollTrack.push(data);
  }

  console.log(JSON.stringify(scrollTrack, null, 2));
  await browser.close();
}

main().catch(console.error);
