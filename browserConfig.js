const chromeOptions = {
    // executablePath: process.env.CHROME_EXECUTABLE_PATH,
    executablePath: "./node_modules/puppeteer/.local-chromium/win64-706915/chrome-win/chrome.exe",
    headless: false,
    slowMo: 100,
    dataViewport: null
}

export default chromeOptions