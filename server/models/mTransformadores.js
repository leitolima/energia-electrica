const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT t.*, e.nombre
        FROM transformadores t
        LEFT JOIN estaciones e ON e.id = t.id_estacion_fk
        WHERE t.borrado = 0;
    `, [])
}

exports.getById = id => {
    return db(`
        SELECT *
        FROM transformadores WHERE id = ?
    `, [id])
}

exports.registrarNuevoTransformador = obj => {
    return db(`
        INSERT INTO transformadores (id_estacion_fk, codigo)
        VALUE(?, ?)
    `, [obj.estacion, obj.codigo]);
}

exports.editarTransformador = obj => {
    return db(`
        UPDATE transformadores SET
        id_estacion_fk = ?,
        codigo = ?
        WHERE id = ?
    `, [obj.estacion, obj.codigo, obj.id]);
}

exports.eliminarTransformador = id => {
    return db(`
        UPDATE transformadores SET borrado = 1 WHERE id = ?;
    `, [id]);
}