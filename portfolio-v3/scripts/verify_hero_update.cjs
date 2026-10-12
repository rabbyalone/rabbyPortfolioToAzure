const { chromium } = require('playwright');
const path = require('path');
const ARTIFACT_DIR = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\67d4ba9b-f9be-4334-8eeb-a9dd9608d7f1';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const metrics = await page.evaluate(() => {
    const nav = document.querySelector('header');
    const navR = nav.getBoundingClientRect();
    const welcome = document.querySelector('#home h2');
    const welcomeR = welcome.getBoundingClientRect();
    const imgWrap = document.querySelector('#home img').parentElement;
    const imgWrapR = imgWrap.getBoundingClientRect();
    const img = document.querySelector('#home img');
    const imgR = img.getBoundingClientRect();
    const h1 = document.querySelector('#home h1');
    const h1R = h1.getBoundingClientRect();

    return {
      navbarBottom: Math.round(navR.bottom),
      welcomeTop: Math.round(welcomeR.top),
      gapNavbarToWelcome: Math.round(welcomeR.top - navR.bottom),
      imgWrapLeft: Math.round(imgWrapR.left),
      imgLeft: Math.round(imgR.left),
      h1Left: Math.round(h1R.left),
      imgWrapToH1Diff: Math.round(imgWrapR.left - h1R.left),
      imgToH1Diff: Math.round(imgR.left - h1R.left),
    };
  });

  console.log('NEW METRICS:', metrics);

  // Take screenshot of entire hero
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'hero_with_welcome_gap.png') });

  // Take zoomed screenshot of the image + name connection
  const h1El = await page.locator('#home h1');
  const imgEl = await page.locator('#home img');
  const imgBox = await imgEl.boundingBox();
  const h1Box = await h1El.boundingBox();

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'zoomed_image_name_alignment.png'),
    clip: {
      x: Math.max(0, imgBox.x - 20),
      y: Math.max(0, imgBox.y + imgBox.height - 40),
      width: 450,
      height: 160
    }
  });

  await browser.close();
}

main().catch(console.error);
