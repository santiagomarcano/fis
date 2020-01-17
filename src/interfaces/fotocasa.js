const puppeteer = require('puppeteer');
const url = 'https://www.fotocasa.es/es/alquiler/viviendas/barcelona-capital/el-poble-sec-parc-de-montjuic/l?latitude=41.372999462171705&longitude=2.1620516134588734&minPrice=800&maxPrice=1100&minRooms=2&combinedLocationIds=724,9,8,232,376,8019,0,1144,297&gridType=3'
const chromeOptions = require('../browserConfig')

const fotocasa = async () => {
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path: 'example.png'});
    // await browser.close();
}

module.exports = fotocasa


