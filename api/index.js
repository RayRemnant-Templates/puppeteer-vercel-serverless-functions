const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

module.exports = async (req, res) => {
    const browser = await puppeteer.launch({
        headless: "new",
        // ...more config options
    });

    const page = await browser.newPage();
    //await page.goto(`<your-target-url>`, { waitUntil: "networkidle2" });

    // ...do something here

    await browser.close();

    res.send("hello");
};