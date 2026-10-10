// Screenshots of the study, for checking and for the README:
//   NODE_PATH=<a node_modules with playwright> node captures/study.cjs [base-url] [out-dir] [widths] [pages]
// Writes <out>/<page>-<width>[-dark].jpg, full page.
const { chromium } = require('playwright');
(async () => {
  const [base = 'http://localhost:5187/', out = 'captures', widths = '1440', pages = 'index,search,stay', scheme = 'light'] = process.argv.slice(2);
  const b = await chromium.launch({ channel: 'chrome' });
  for (const page of pages.split(',')) for (const w of widths.split(',').map(Number)) {
    const [name, query] = page.split('?');
    const p = await (await b.newContext({ viewport: { width: w, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 })).newPage();
    const errors = []; p.on('console', (m) => m.type() === 'error' && errors.push(m.text())); p.on('pageerror', (e) => errors.push(String(e)));
    await p.goto(`${base}${name}.html${query ? `?${query}` : ''}`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts && document.fonts.ready);
    // Lazy images load as they come into view: walk the page once.
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); });
    await p.waitForLoadState('networkidle'); await p.waitForTimeout(500);
    await p.screenshot({ path: `${out}/study-${name}-${w}${scheme === 'dark' ? '-dark' : ''}.jpg`, fullPage: true, type: 'jpeg', quality: 72 });
    console.log(name, w, errors.length ? errors.slice(0, 3) : 'ok');
    await p.context().close();
  }
  await b.close();
})();
