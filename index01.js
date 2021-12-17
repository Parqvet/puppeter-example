const puppeteer = require('puppeteer');

const { generarUser } = require('./generadorData');

async function completarSignup() {
    // se crea un browser con la funcion launch de puppeteer
    // todas las funciones de puppeteer retornan una promesa
    // utilizamos await para que la promesa se resuelva
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
    await page.goto('https://beta.clontagram.com/signup', {
        timeout: 15000, // 15 segundos
        waitUntil: 'networkidle0' // este flag significa: espera a. cuando esa promesa, una vez que la pagina se cargo, se va a resolver
        // usamos la propiedad 'networkidle0' para esperar a que no hayan requests en vuelo por 500ms
    });

    // elegimos el campo que queremos rellenar, con el signo $ es lo mismo que decir document.querySelector
    // ponemos await para esperar que la promesa se resuelva o que tire un error
    const inputEmail = await page.$('form > input[name="email"]');
    const inputName = await page.$('form > input[name="nombre"]');
    const inputUsername = await page.$('form > input[name="username"]');
    const inputBio = await page.$('form > input[name="bio"]');
    const inputPassword = await page.$('form > input[name="password"]');

    const user = generarUser();

    // utilizamos la funcion type para escribir en el campo
    // utilizar el generador de datos en cada uno de los inputs
    await inputEmail.type(user.email);
    await inputName.type(user.nombre);
    await inputUsername.type(user.username);
    await inputBio.type(user.bio);
    await inputPassword.type(user.password);

    // seleccionamos el boton de signup
    const botonSignup = await page.$('form > button[type="submit"]');
    // utlizamos la funcion de clik en el mismo
    await botonSignup.click();
}

completarSignup();