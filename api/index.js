const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

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

module.exports = x;
