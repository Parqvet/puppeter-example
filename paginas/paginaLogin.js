const PaginaFeed = require('./paginaFeed');

const SELECTOR_EMAIL = 'form > input[name="email"]';
const SELECTOR_PASSWORD = 'form > input[name="password"]';
const SELECTOR_BUTTON_LOGIN = 'form > button[type="submit"]';

class PaginaLogin {

    constructor(page) {
        thes.page = page;
    }

    // esta funcion recibe al usuario con sus credenciales
    // recibe un objeto con propiedades
    async llenarFormularioLogin({ email, password }) {
        await this.page.type(SELECTOR_EMAIL, email);
        await this.page.type(SELECTOR_PASSWORD, password);
    }

    async clickLogin() {
        await this.page.click(SELECTOR_BUTTON_LOGIN);
        return new PaginaFeed(this.page);
    }
}

module.exports = PaginaLogin;