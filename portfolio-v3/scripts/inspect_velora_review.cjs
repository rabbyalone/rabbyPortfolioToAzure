const { chromium } = require('playwright');
const path = require('path');
const ARTIFACT_DIR = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\67d4ba9b-f9be-4334-8eeb-a9dd9608d7f1';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://velora-template.framer.website/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to review
  await page.evaluate(() => document.querySelector('#review').scrollIntoView());
  await page.waitForTimeout(500);

  // Take screenshot of page 1
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'velora_review_p1.png') });

  // Click dot 2
  const dot2 = await page.$('button[aria-label="Scroll to page 2"]');
  if (dot2) {
    await dot2.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'velora_review_p2.png') });
  }

  // Inspect slideshow structure and cards
  const info = await page.evaluate(() => {
    const sec = document.querySelector('#review');
    const slideshow = sec.querySelector('.framer-slideshow') || sec.querySelector('[class*="slideshow"]');
    const slides = Array.from(sec.querySelectorAll('.framer-60hslp-container, .framer-1xidv3y, [data-framer-name*="Slide"], [data-framer-name*="Review"]'));
    return {
      slideshowClass: slideshow ? slideshow.className : null,
      slideshowStyle: slideshow ? slideshow.getAttribute('style') : null,
      slideshowRect: slideshow ? slideshow.getBoundingClientRect() : null,
      slidesCount: slides.length,
      firstSlide: slides[0] ? {
        class: slides[0].className,
        style: slides[0].getAttribute('style'),
        text: slides[0].textContent.slice(0, 100)
      } : null
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
}

main().catch(console.error);
