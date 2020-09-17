const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT e.*, e.nombre,
        c.nombre AS nombrecentral,
        p.nombre AS nombreprov
        FROM estaciones e
        LEFT JOIN centrales c ON c.id = e.id_central_fk
        LEFT JOIN provincias p ON p.id = e.id_provincia_fk
        WHERE e.borrado = 0;
    `, [])
}

exports.getById = id => {
    return db(`
        SELECT id, nombre, 
        id_central_fk AS central,
        id_provincia_fk AS provincia
        FROM estaciones 
        WHERE id = ?
    `, [id])
}

exports.registrarNuevaEstacion = obj => {
    return db(`
        INSERT INTO estaciones (nombre, id_central_fk, id_provincia_fk)
        VALUES (?, ?, ?)
    `, [obj.nombre, obj.central, obj.provincia]);
}

exports.editarEstacion = obj => {
    return db(`
        UPDATE estaciones SET
        nombre = ?,
        id_central_fk = ?,
        id_provincia_fk = ?
        WHERE id = ?
    `, [obj.nombre, obj.central, obj.provincia, obj.id]);
}

exports.eliminarEstacion = id => {
    return db(`
        UPDATE estaciones SET borrado = 1 WHERE id = ?;
    `, [id]);
}