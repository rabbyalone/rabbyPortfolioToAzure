const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://velora-template.framer.website/', { waitUntil: 'networkidle' });

  const details = await page.evaluate(() => {
    const img = document.querySelector('img');
    const animatedDiv = img.parentElement.parentElement;
    const style = window.getComputedStyle(animatedDiv);
    return {
      transformOrigin: style.transformOrigin,
      willChange: style.willChange,
      overflow: style.overflow,
      borderRadius: style.borderRadius
    };
  });

  console.log(JSON.stringify(details, null, 2));
  await browser.close();
}

main().catch(console.error);
