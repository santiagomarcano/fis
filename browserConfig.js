const chromeOptions = {
    // executablePath: process.env.CHROME_EXECUTABLE_PATH,
    // executablePath: "./node_modules/puppeteer/.local-chromium/win64-706915/chrome-win/chrome.exe",
    headless: true,
    slowMo: 1000,
    devtools: true,
    dataViewport: null,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
    ],
}

export default chromeOptions