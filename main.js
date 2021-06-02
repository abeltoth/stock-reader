const { Builder, By, until } = require('selenium-webdriver');

(async function main() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.investing.com');

        const acceptPrivacyBtn = await driver.findElement(By.id('onetrust-accept-btn-handler'));
        acceptPrivacyBtn.click();

        const interestingStocks = ['AFL'];

        interestingStocks.forEach((stock) => {
            getStockData(stock, driver);
        });
    } finally {
        // await driver.quit();
    }
})();

async function getStockData(stock, driver) {
    await navigateToStockPage(stock, driver);
    await getStockDetails(stock, driver);
}

async function navigateToStockPage(stock, driver) {
    const searchBar = await driver.findElement(By.css('.js-main-search-bar'));
    searchBar.sendKeys(stock);
    const searchResult = await driver.wait(until.elementLocated(By.css('.js-table-results a:first-child')), 10000);
    searchResult.click();
}

async function getStockDetails(stock, driver) {
    // const dividendYield =
}
