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

exports.getPropietariosDeRed = id => {
    return db(`
        SELECT c.nombre AS compania, c.id
        FROM companias c 
        LEFT JOIN propiedad_red pr ON pr.id_compania_fk = c.id
        WHERE id_red_fk = ?
    `, [id]);
}

exports.getNotPropietarias = idred => {
    return db(`
        SELECT id, nombre
        FROM companias c
        WHERE borrado = 0 AND id NOT IN (
            SELECT id_compania_fk FROM propiedad_red 
            WHERE id_red_fk = ?
        );
    `, [idred]);
}