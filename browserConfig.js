const chromeOptions = {
    executablePath: process.env.CHROME_EXECUTABLE_PATH,
    headless: true,
    slowMo: 1000,
    devtools: true,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
    ],
}

export default chromeOptions
'/app/node_modules/puppeteer/.local-chromium/linux-706915/chrome-linux/chrome'