const crypto = require('crypto');

function generarUser() {
    // utilizar la funcion randomBytes para generar 12 bytes aleatorios y despues pasarlos a string
    // 'hex' nos garantiza que el resultado es alfanumerico, no hay simbolos
    // cada username empieza con test
    const username = `Test${crypto.randomBytes(12).toString('hex')}`;

    // asignamos el username random al objeto
    return {
        username: username,
        email: `${username}@gmail.com`,
        password: 'testing',
        nombre: 'User Test',
        bio: 'Testing user',
    }
}

module.exports = {
    generarUser
}