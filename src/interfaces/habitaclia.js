const puppeteer = require('puppeteer');
const url = 'https://www.habitaclia.com/alquiler-poble_sec-barcelona.htm?filtro_periodo=3&hab=2&pmin=800&pmax=1100&codzonas=301&coddists=300'
const chromeOptions = require('../browserConfig')
const maxPrice = 1050

const habitaclia = async () => {
    return new Promise(async (resolve) => {
        const browser = await puppeteer.launch(chromeOptions);
        const page = await browser.newPage();
        await page.goto(url);
        await page.waitFor('.js-list-item')
        const scrappedResults = await page.$$eval(
            '.js-list-item', elements =>
                elements.map(element => {        
                    return ({
                        title: element.querySelector('.list-item-title > a').innerHTML,
                        description: element.querySelector('p[class=list-item-description]').innerHTML,
                        image: element.querySelector('div[class=image] > img').getAttribute('src'),
                        price: element.querySelector('span[class=font-2]').innerHTML,
                        link: element.querySelector('.list-item-title > a').getAttribute('href')
                    })
                })
        )
        const results = scrappedResults.filter(dataSet => {
            let priceArr = dataSet.price.split(' ')[0].split('.')
            const price = parseInt(priceArr.join('')) 
            return price <= maxPrice
        })
        await page.screenshot({path: 'example.png'})
        await browser.close()
        resolve(results)
    })
}

module.exports = habitaclia


