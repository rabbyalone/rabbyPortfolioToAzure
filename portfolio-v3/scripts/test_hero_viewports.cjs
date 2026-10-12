const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\67d4ba9b-f9be-4334-8eeb-a9dd9608d7f1';

async function testViewports() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const viewports = [
    { name: 'desktop_1440x900', width: 1440, height: 900 },
    { name: 'laptop_1366x768', width: 1366, height: 768 },
    { name: 'tablet_768x1024', width: 768, height: 1024 },
    { name: 'mobile_390x844', width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, `hero_test_${vp.name}.png`),
      clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 900) }
    });
    await page.close();
  }
  await browser.close();
  console.log('All viewports tested successfully');
}

testViewports().catch(console.error);
