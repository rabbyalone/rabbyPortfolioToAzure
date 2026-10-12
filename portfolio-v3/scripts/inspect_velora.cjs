const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://velora-template.framer.website/', { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    function getInfo(el) {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        className: el.className,
        rect: {
          x: Math.round(r.x),
          y: Math.round(r.y),
          width: Math.round(r.width),
          height: Math.round(r.height),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom)
        },
        padding: cs.padding,
        margin: cs.margin,
        display: cs.display,
        justifyContent: cs.justifyContent,
        alignItems: cs.alignItems,
        flexDirection: cs.flexDirection,
        position: cs.position
      };
    }

    const allH1s = Array.from(document.querySelectorAll('h1')).map(getInfo);
    const allH2s = Array.from(document.querySelectorAll('h2')).map(getInfo);
    const welcome = Array.from(document.querySelectorAll('*')).find(el => el.textContent?.trim() === 'Welcome.' && el.children.length === 0);
    const jane = Array.from(document.querySelectorAll('*')).find(el => el.textContent?.trim() === 'Jane Smith' && el.children.length === 0);
    const heroImg = document.querySelector('img');

    // Also look at the hero container structure
    let current = welcome;
    const welcomeAncestors = [];
    while (current && current !== document.body) {
      welcomeAncestors.push(getInfo(current));
      current = current.parentElement;
    }

    let imgCurrent = heroImg;
    const imgAncestors = [];
    while (imgCurrent && imgCurrent !== document.body) {
      imgAncestors.push(getInfo(imgCurrent));
      imgCurrent = imgCurrent.parentElement;
    }

    return {
      welcome: getInfo(welcome),
      jane: getInfo(jane),
      heroImg: getInfo(heroImg),
      welcomeAncestors: welcomeAncestors.slice(0, 5),
      imgAncestors: imgAncestors.slice(0, 5),
    };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
}

main().catch(console.error);
