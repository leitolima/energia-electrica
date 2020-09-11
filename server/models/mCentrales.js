const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT c.*, tc.tipo FROM centrales c
        LEFT JOIN tipo_central tc ON tc.id = c.tipo_central_fk
        WHERE borrado = 0;
    `, []);
}