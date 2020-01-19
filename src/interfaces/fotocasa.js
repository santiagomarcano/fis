import puppeteer from 'puppeteer'
import Department from 'models/Department.model'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import chromeOptions from '../../browserConfig'
const url = 'https://www.fotocasa.es/es/alquiler/viviendas/barcelona-capital/el-poble-sec-parc-de-montjuic/l?latitude=41.372999462171705&longitude=2.1620516134588734&minPrice=800&maxPrice=1100&minRooms=2&combinedLocationIds=724,9,8,232,376,8019,0,1144,297&gridType=3'
const baseUrl = 'https://www.fotocasa.es'

const scrollAndWait = async (page) => {
    await page.evaluate(() => {
        window.scrollBy(0, 300)
    })
    await page.waitFor(1500)
}

const getHTML = async () => {

    const browser = await puppeteer.launch({ ...chromeOptions, executablePath: process.env.CHROME_EXECUTABLE_PATH })
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0' })

    for (let i = 0; i < 60; i++) {
        await scrollAndWait(page)
        i++
    }

    const content = await page.content()
    fs.writeFileSync(path.resolve(__dirname, '../assets/fotocasa.html'), content)
    await browser.close()

    return content
}

const scrapeHTML = (html) => {
    const $ = cheerio.load(html)
    const items = $('.re-Searchresult-itemRow')
    const results = []
    items.each((_, e) => {
        const link = baseUrl + $(e).find('a.re-CardImage-link').attr('href')
        const item = {
            link,
            reference: link,
            image: $(e).find('.re-CardImage-image').attr('src'),
            price: $(e).find('span.re-Card-price').text().split('/')[0].trim(),
            title: $(e).find('.re-Card-title').text(),
            contact: $(e).find('span.sui-AtomButton-text').text().split('C')[0],
            description: $(e).find('.re-Card-description').text()
        }
        results.push(item)
    })
    return results
}

const fotocasa = async () => {
    const html = await getHTML()
    if (!html) return html
    const results = scrapeHTML(html)
    // console.log(results)
    results.forEach(async (result) => {
        const department = await Department.findOneAndUpdate(
            { reference: result.reference },
            result,
            { new: true, upsert: true }
        )
    })
}

export default fotocasa



