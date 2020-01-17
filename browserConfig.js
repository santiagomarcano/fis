const chromeOptions = {
    // executablePath: process.env.CHROME_EXECUTABLE_PATH,
    executablePath: "./node_modules/puppeteer/.local-chromium/win64-706915/chrome-win/chrome.exe",
    headless: false,
    slowMo: 1000,
    devtools: true,
    dataViewport: null
}

export default chromeOptions