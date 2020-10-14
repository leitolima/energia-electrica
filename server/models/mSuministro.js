const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT *
        FROM suministro
    `, [])
}

exports.getById = id => {
    return db(`
        SELECT *
        FROM suministro WHERE id = ?
    `, [id])
}

exports.registrarNuevoSuministro = obj => {
    return db(`
        INSERT INTO suministro (nombre, pais,cant_plutonio)
        VALUE(?, ?, ?)
    `, [obj.nombre, obj.pais,obj.cant_plutonio]);
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