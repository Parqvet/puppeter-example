const puppeteer = require('puppeteer');

// se le pasan tres parametros
async function crearPagina({ 
    url, 
    // si el parametro browserConfig no esta especificado
    // por default tendra headless en true
    browserConfig = { headless: true },
    // como ultimo parametro le pasamos la config de la pagina
    pageConfig = {
        timeout: 15000,
        waitUntil: 'networkidle0'
    }  }) {

        const browser = await puppeteer.launch(browserConfig);
        const page = await browser.newPage();

        await page.goto(url, pageConfig);

        // se retorna el browser y la pagina
        return {
            browser,
            page
        }
    }

    module.exports = {
        crearPagina
    }