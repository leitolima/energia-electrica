const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT *
        FROM estaciones
        WHERE borrado = 0;
    `, [])
}

exports.getById = id => {
    return db(`
        SELECT id, nombre 
        FROM estaciones WHERE id = ?
    `, [id])
}

exports.registrarNuevaEstacion = obj => {
    return db(`
        INSERT INTO estaciones (nombre)
        VALUES (?)
    `, [obj.nombre]);
}

exports.editarEstacion = obj => {
    return db(`
        UPDATE estaciones SET
        nombre = ?
        WHERE id = ?
    `, [obj.nombre, obj.id]);
}

exports.eliminarEstacion = id => {
    return db(`
        UPDATE estaciones SET borrado = 1 WHERE id = ?;
    `, [id]);
}