const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT s.*, c.nombre AS central, t.nombre AS transportista
        FROM suministro s
        LEFT JOIN centrales c ON c.id = s.id_nuclear_fk
        LEFT JOIN transportista t ON t.id = s.id_transportista_fk
        WHERE s.borrado = 0
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
        INSERT INTO suministro (nombre, pais,id_nuclear_fk,id_transportista_fk,fecha)
        VALUE(?, ?, ?, ?, Now())
    `, [obj.nombre, obj.pais, obj.central, obj.transportista]);
}

exports.editarSuministro = obj => {
    return db(`
        UPDATE suministro SET
        nombre = ?,
        pais = ?,
        id_nuclear_fk = ?,
        id_transportista_fk = ?,
        cant_plutonio = ?
        WHERE id = ?
    `, [obj.nombre, obj.pais,obj.central,obj.transportista,obj.cant_plutonio,obj.id]);
}

exports.eliminarSuministro = id => {
    return db(`
        UPDATE suministro SET borrado = 1 WHERE id = ?;
    `, [id]);
}