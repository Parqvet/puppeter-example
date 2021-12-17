const puppeteer = require('puppeteer');

const { SIGNUP_URL } = require('../config/urls');
const { generarUser } = require('../generadorData');
const { crearPagina } = require('../paginas/fabricaDePaginas');
const PaginaSignup = require('../paginas/paginaSignup');

const TIMEOUT_INICIALIZAR_BROWSER = 15000;

// se crea un email y username ya registrados para los tests
const USUARIO_EMAIL_REGISTRADO = {
    // generar los otros datos con la funcion generarUser
    // se utiliza spreed operator
    ...generarUser(),
    email: 'pepe@gmail.com'
};

const USUARIO_USERNAME_REGISTRADO = {
    ...generarUser(),
    username: 'pepe'
};

// definimos variables globales para poder utilizarlas dentro de los tests
// escribir variable contexto
let contexto, paginaSignup;

// funcion global de jest, recibe una funcion anonima
// beforEach significa antes de cada test
// iniciar el browser y dirigirse a la pagina de signup
beforeEach( async () => {

    // la funcion crearPagina nos retorna una promesa
    // asignar en una constante, en destructuring lo que se recibe (opcional)
    contexto = await crearPagina({ url: SIGNUP_URL });

    /* await page.goto(SIGNUP_URL, {
        timeout: 15000,
        waitUntil: 'networkidle0'
    }); */

    // como parametro le pasamos la pagina del contexto
    paginaSignup = new PaginaSignup(contexto.page);

}, TIMEOUT_INICIALIZAR_BROWSER) // incrementar en 15 segundos para que tenga mas tiempo

// significa despues de cada test
// cerrar el browser
afterEach( async () => {
    // await browser.close();

    await contexto.browser.close();
})

// con describe definimos los tests (test suite), y los agrupamos
// le pasamos un callback
describe('Signup de Clontagram', () => {

    test('Debe llevar al usuario al feed luego de hacer signup', async () => {

        const user = generarUser();
        await paginaSignup.llenarFormularioSignup(user);

        // ahora clickSignup nos retorna al feed
        const paginaFeed = await paginaSignup.clickSignup();
        // se verifica que estamos en el feed
        await paginaFeed.verificarFeedVacio();

        // la funcion test puede recibir un parametro que indica el tiempo de espera antes de que falle
        // si no definimos el tiempo, por default el tiempo es de 5 segundos
    });

    test('Debe mostrar un error cuando el email ya está registrado', async () => {

        // a llenarFormulario se le pasa el user con email ya registrado
        await paginaSignup.llenarFormularioSignup(USUARIO_EMAIL_REGISTRADO);
        await paginaSignup.clickSignup();

        // se verificar que el error es mostrado
        await paginaSignup.verificarErrorEsMostrado();
    })

    test('Debe mostrar un error cuando el username ya está registrado', async () => {
        
        // a llenarFormulario se le pasa el user con username ya registrado
        await paginaSignup.llenarFormularioSignup(USUARIO_USERNAME_REGISTRADO);
        await paginaSignup.clickSignup();
        
        // se verifica que el error es mostrado
        await paginaSignup.verificarErrorEsMostrado();
    })

})