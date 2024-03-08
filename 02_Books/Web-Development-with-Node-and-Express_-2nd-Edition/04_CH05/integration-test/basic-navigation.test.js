const portfinder = require('portfinder');
const puppeteer = require('puppeteer');

const app = require('../meadowlark.js');

let server = null;
let port = null;

beforeEach(async () => {
    port = await portfinder.getPortPromise();
    console.log('port: ', port);
    server = app.listen(port);
});

afterEach(() => {
    server.close();
})

test('test home page', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}/`);
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id]')
    ]);
    expect(page.url()).toBe(`http://localhost:${port}/about`);
    await browser.close();
});