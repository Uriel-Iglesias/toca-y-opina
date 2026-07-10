const puppeteer = require('/tmp/node_modules/puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 2200, deviceScaleFactor: 2 });
  const file = 'file://' + path.resolve(__dirname, '_preview-avatar.html');
  await page.goto(file, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.resolve(__dirname, 'avatar-social-preview.png'), fullPage: true });
  await browser.close();
})();
