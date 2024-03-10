const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const x = async (req, res) => {
  const { url, requestUrl } = req.query;
  console.log("Query parameters:", queryParams);

  const browser = await puppeteer.launch({
    headless: "new",
    // ...more config options
  });

  const page = await browser.newPage();

  console.log("he");

  //await page.setRequestInterception(true);

  await page.goto(url, {
    timeout: 10000,
  });

  const finalResponse = await page.waitForResponse(
    (response) =>
      response.url() === requestUrl &&
      (response.request().method() === "PATCH" ||
        response.request().method() === "POST"),
    11
  );
  let responseJson = await finalResponse.json();

  console.log(responseJson);

  await browser.close();

  res.send(responseJson);
};

module.exports = x;
