const chromeOptions = {
    executablePath: process.env.CHROME_EXECUTABLE_PATH,
    headless: true,
    slowMo: 1000,
    devtools: true,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
    ],
}

export default chromeOptions