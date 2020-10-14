const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT c.*, tc.tipo FROM centrales c
        LEFT JOIN tipo_central tc ON tc.id = c.tipo_central_fk
        WHERE borrado = 0;
    `, []);
}

exports.getPorTipoNuclear = () => {
    return db(`
    SELECT nombre 
    FROM centrales 
    LEFT JOIN tipo_central ON tipo_central.id = centrales.tipo_central_fk
    WHERE tipo_central_fk = 3 AND borrado = 0;
    `, []);
}