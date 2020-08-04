const db = require('../db').db().query;

exports.findUser = (usuario) => {
    return db(`
        SELECT id, clave FROM usuarios WHERE usuario = ?
    `, [usuario]);
}