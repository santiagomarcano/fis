import puppeteer from 'puppeteer'
import cheerio from 'cheerio'
import chromeOptions from '../../browserConfig'
import Department from 'models/Department.model'
import fs from 'fs'
import path from 'path'
const url = 'https://www.idealista.com/alquiler-viviendas/barcelona/sants-montjuic/el-poble-sec-parc-de-montjuic/con-precio-hasta_1100,precio-desde_800,de-dos-dormitorios,de-tres-dormitorios,de-cuatro-cinco-habitaciones-o-mas/'

const getHTML = async () => {
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.content()
    fs.writeFileSync(path.resolve(__dirname, '../assets/idealista.html'), content)
    if (content.includes('robot')) {
        console.log('Idealista fuckedup')
        return false
    }
    await browser.close();
    return content
}

const scrapeHTML = (html) => {
    const $ = cheerio.load(html)
    const items = $('.item')
    const results = []
    items.each((_, e) => {
        const item = {
            reference: $(e).attr('data-adid'),
            image: $(e).find('img.vertical').attr('data-ondemand-img') || $(e).find('img.horizontal').attr('src'),
            link: 'https://idealista.com' + $(e).find('.item-link').attr('href'),
            price: $(e).find('.item-price.h2-simulated').text().split('/')[0],
            title: $(e).find('.item-link').text(),
            contact: $(e).find('.icon-phone.item-not-clickable-phone').text()
        }
        results.push(item)
    })
    return results
}

const idealista = async () => {
    const html = await getHTML()
    if (!html) return html
    const results = await scrapeHTML(html)
    results.forEach(async (result) => {
        const department = await Department.findOneAndUpdate(
            { reference: result.reference },
            result,
            { new: true, upsert: true }
        )
        console.log(department)
    })
}

export default idealista