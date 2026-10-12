const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://velora-template.framer.website/', { waitUntil: 'networkidle' });

  const heroDetails = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const heroSection = h1.closest('section');
    const welcome = Array.from(document.querySelectorAll('*')).find(e => e.textContent === 'Welcome.');
    const img = document.querySelector('img');
    const scrollMore = Array.from(document.querySelectorAll('*')).find(e => e.textContent === 'Scroll to see more');

    function getBox(el) {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const s = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        className: el.className,
        top: Math.round(r.top + window.scrollY),
        left: Math.round(r.left),
        width: Math.round(r.width),
        height: Math.round(r.height),
        marginTop: s.marginTop,
        marginBottom: s.marginBottom,
        paddingTop: s.paddingTop,
        paddingBottom: s.paddingBottom,
        position: s.position,
        display: s.display
      };
    }

    return {
      section: getBox(heroSection),
      sectionStyle: {
        display: window.getComputedStyle(heroSection).display,
        flexDirection: window.getComputedStyle(heroSection).flexDirection,
        justifyContent: window.getComputedStyle(heroSection).justifyContent,
        alignItems: window.getComputedStyle(heroSection).alignItems,
        padding: window.getComputedStyle(heroSection).padding,
        height: heroSection.offsetHeight,
        minHeight: window.getComputedStyle(heroSection).minHeight
      },
      welcome: getBox(welcome),
      welcomeParent: getBox(welcome ? welcome.parentElement : null),
      img: getBox(img),
      imgContainer: getBox(img ? img.closest('div[style*="scale"]') || img.parentElement.parentElement : null),
      h1: getBox(h1),
      scrollMore: getBox(scrollMore)
    };
  });

  console.log(JSON.stringify(heroDetails, null, 2));
  await browser.close();
}

main().catch(console.error);
