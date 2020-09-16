const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT *
        FROM companias
        WHERE borrado = 0;
    `, [])
}

exports.getById = id => {
    return db(`
        SELECT id, nombre 
        FROM companias WHERE id = ?
    `, [id])
}

exports.registrarNuevaCompania = obj => {
    return db(`
        INSERT INTO companias (nombre)
        VALUES (?)
    `, [obj.nombre]);
}

exports.editarCompania = obj => {
    return db(`
        UPDATE companias SET
        nombre = ?
        WHERE id = ?
    `, [obj.nombre, obj.id]);
}

exports.eliminarCompania = id => {
    return db(`
        UPDATE companias SET borrado = 1 WHERE id = ?;
    `, [id]);
}