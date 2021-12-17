const puppeteer = require('puppeteer');

const { SIGNUP_URL, LOGIN_URL } = require('./config/urls');
const { generarUser } = require('./generadorData');
const PaginaSignup = require('./paginas/paginaSignup');

async function completarSignup() {
    // se crea un browser con la funcion launch de puppeteer
    // todas las funciones de puppeteer retornan una promesa

    const browser = await puppeteer.launch({
        // puppeter por default corre en headless, significa que no tiene una ventana
        // entonces lo ponemos en falso, para que nos lance una ventana de chrome
        headless: false
    });

    // se crea una nueva pagina con la funcion newPage
    const page = await browser.newPage();

    // nos dirigimos a una pagina con la funcion goto
    // utilizamos await porque vamos a emplear una funcion que retorna una promesa
    // a su vez le pasamos un objeto de configuracion
    await page.goto(SIGNUP_URL, {
        timeout: 15000, // 15 segundos
        waitUntil: 'networkidle0' // este flag significa: espera a. cuando esa promesa, una vez que la pagina se cargo, se va a resolver
        // usamos la propiedad 'networkidle0' para esperar a que no hayan requests en vuelo por 500ms
    });

    // instanciar una nueva clase de pagina de signup
    // como parametro le pasamos la pagina
    const paginaSignup = new PaginaSignup(page);

    const user = generarUser();

    // ahora podemos tomar las acciones que se van a hacer en la pagina de signup
    // como parametro a llenarFormulario le pasamos un usuario
    // las funciones son asincronas y por ende retornan promesas
    // entonces hay que utilizar await para esperar que esas promesas se resuelvan o fallen
    await paginaSignup.llenarFormularioSignup(user);
    await paginaSignup.clickSignup();

}

completarSignup();