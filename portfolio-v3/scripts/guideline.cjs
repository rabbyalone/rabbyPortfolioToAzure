const { chromium } = require('playwright');
const fs = require('fs');

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  const imgData = fs.readFileSync('C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\67d4ba9b-f9be-4334-8eeb-a9dd9608d7f1\\.user_uploaded\\media_1791638624978.png').toString('base64');

  await page.setContent(`<!DOCTYPE html><html><body><img id="u" src="data:image/png;base64,${imgData}" /></body></html>`);
  await page.waitForTimeout(200);

  const res = await page.evaluate(() => {
    const img = document.querySelector('#u');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const isBg = (r, g, b) => (r >= 240 && g >= 240 && b >= 240);

    let imgMinX = 9999;
    for (let y = 0; y < 70; y++) {
      for (let x = 0; x < 200; x++) {
        const p = ctx.getImageData(x, y, 1, 1).data;
        if (!isBg(p[0], p[1], p[2])) {
          if (x < imgMinX) imgMinX = x;
          break;
        }
      }
    }

    let textMinX = 9999;
    for (let y = 100; y < canvas.height; y++) {
      for (let x = 0; x < 200; x++) {
        const p = ctx.getImageData(x, y, 1, 1).data;
        if (p[0] < 50 && p[1] < 50 && p[2] < 50) {
          if (x < textMinX) textMinX = x;
          break;
        }
      }
    }

    return { imgMinX, textMinX, delta: textMinX - imgMinX };
  });

  console.log('MEASURED DELTA IN USER SCREENSHOT:', res);
  await browser.close();
}

main().catch(console.error);
