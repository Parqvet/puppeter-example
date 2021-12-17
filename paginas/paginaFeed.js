const SELECTOR_EXPLORA_CLONTAGRAM_BOX = "div[class='NoSiguesANadie']";

class PaginaFeed {

    constructor(page) {
        this.page = page;
    }

    async verificarFeedVacio() {
        // la funcion waitForSelector buscara el selector que se indica hasta encontrarlo
        // si no lo encuentra nos lanzara un error, por ende el test fallara
        await this.page.waitForSelector(SELECTOR_EXPLORA_CLONTAGRAM_BOX, {
            // indicar que el box este visible en la pagina
            visible: true
        });
    }
}

module.exports = PaginaFeed;