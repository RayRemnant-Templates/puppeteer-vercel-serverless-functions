const puppeteer = require("puppeteer-extra");

// Add the Imports before StealthPlugin
require("puppeteer-extra-plugin-stealth/evasions/chrome.app");
require("puppeteer-extra-plugin-stealth/evasions/chrome.csi");
require("puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes");
require("puppeteer-extra-plugin-stealth/evasions/chrome.runtime");
require("puppeteer-extra-plugin-stealth/evasions/defaultArgs"); // pkg warned me this one was missing
require("puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow");
require("puppeteer-extra-plugin-stealth/evasions/media.codecs");
require("puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency");
require("puppeteer-extra-plugin-stealth/evasions/navigator.languages");
require("puppeteer-extra-plugin-stealth/evasions/navigator.permissions");
require("puppeteer-extra-plugin-stealth/evasions/navigator.plugins");
require("puppeteer-extra-plugin-stealth/evasions/navigator.vendor");
require("puppeteer-extra-plugin-stealth/evasions/navigator.webdriver");
require("puppeteer-extra-plugin-stealth/evasions/sourceurl");
require("puppeteer-extra-plugin-stealth/evasions/user-agent-override");
require("puppeteer-extra-plugin-stealth/evasions/webgl.vendor");
require("puppeteer-extra-plugin-stealth/evasions/window.outerdimensions");
require("puppeteer-extra-plugin-user-preferences");

// Now you can import the StealthPlugin :D
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
// The rest of your code here :)

const x = async (req, res) => {
  const browser = await puppeteer.launch({
    headless: "new",
    // ...more config options
  });

  const page = await browser.newPage();

  //await page.setRequestInterception(true);

  const urlOfRequest = "https://graphql.hagglezon.com/";

  await page.goto(`https://www.hagglezon.com/en/s/B0BX4J8M5J`, {
    timeout: 10000,
  });

  const finalResponse = await page.waitForResponse(
    (response) =>
      response.url() === urlOfRequest &&
      (response.request().method() === "PATCH" ||
        response.request().method() === "POST"),
    11
  );
  let responseJson = await finalResponse.json();

  console.log(responseJson);

  await page.screenshot({ path: "./stuff.png" });

  //await page.goto(`<your-target-url>`, { waitUntil: "networkidle2" });

  // ...do something here

  await browser.close();

  //res.send("hello");
};

x();

module.exports = x;
