console.log(process.env.CHROME_EXECUTABLE_PATH)

const chromeOptions = {
    headless: true,
    slowMo: 1000,
    devtools: true,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
    ],
}

export default chromeOptions