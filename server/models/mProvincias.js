const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT * FROM provincias;
    `, [])
}

exports.getById = id => {
    return db(`
        SELECT * FROM provincias
        WHERE id = ?
    `, [id])
}

exports.registrarNuevaProvincia = obj => {
    return db(`
        INSERT INTO provincias (codigo, nombre)
        VALUES (?, ?)
    `, [obj.codigo, obj.nombre]);
}

exports.editarProvincia = obj => {
    return db(`
        UPDATE provincias SET
        codigo = ?, nombre = ?
        WHERE id = ?
    `, [obj.codigo, obj.nombre, obj.id]);
}

exports.eliminarProvincia = id => {
    return db(`
        DELETE FROM provincias
        WHERE id = ?
    `, [id]);
}