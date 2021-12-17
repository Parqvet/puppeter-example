const PaginaFeed = require('./paginaFeed');

const SELECTOR_EMAIL = 'form > input[name="email"]';
const SELECTOR_NOMBRE = 'form > input[name="nombre"]';
const SELECTOR_USERNAME = 'form > input[name="username"]';
const SELECTOR_BIO = 'form > input[name="bio"]';
const SELECTOR_PASSWORD = 'form > input[name="password"]';

const SELECTOR_BUTTON_SUBMIT = 'form > button[type="submit"]';
const SELECTOR_CAJA_ERROR = "div[class='ErrorContainer']";

// creamos una clase para representar a la pagina de signup
// es un patron muy utilizado en estos tipos de codigo de automatizacion, se lo conoce como Page Object Model
class PaginaSignup {
    // al constructor le pasamos como parametro una pagina
    constructor(page) {
        // guardamos la pagina que nos pasan en la clase
        // de esta forma podemos crear una instancia de signup con la pagina que nos pasan
        this.page = page;
    }

    // le pasamos como parametro un usuario
    async llenarFormularioSignup(user) {
        // tipeamos directamente en el formulario pasandole el selector y los datos
        await this.page.type(SELECTOR_EMAIL, user.email);
        await this.page.type(SELECTOR_NOMBRE, user.nombre);
        await this.page.type(SELECTOR_USERNAME, user.username);
        await this.page.type(SELECTOR_BIO, user.bio);
        await this.page.type(SELECTOR_PASSWORD, user.password);
    }

    async clickSignup() {
        await this.page.click(SELECTOR_BUTTON_SUBMIT);
        // una vez que se hizo click en el boton de registro
        // se retorna un modelo de la pagina del feed
        return new PaginaFeed(this.page);
    }

    async verificarErrorEsMostrado() {
        // se espera que el selector aparezca y que sea visible
        await this.page.waitForSelector(SELECTOR_CAJA_ERROR, { visible: true });
    }
}

module.exports = PaginaSignup;