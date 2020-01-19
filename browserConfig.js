const chromeOptions = {
    headless: false,
    slowMo: 1000,
    devtools: true,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
    ],
}

export default chromeOptions