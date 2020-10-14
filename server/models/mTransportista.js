const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT *
        FROM transportista
    `, [])
}

exports.getById = id => {
    return db(`
        SELECT id, nombre, matricula 
        FROM transportista WHERE id = ?
    `, [id])
}

exports.registrarNuevoTransportista = obj => {
    return db(`
        INSERT INTO transportista (nombre,matricula)
        VALUES (?,?)
    `, [obj.nombre,obj.matricula]);
}

exports.editarTransportista = obj => {
    return db(`
        UPDATE transportista SET
        nombre = ?, matricula = ?
        WHERE id = ?
    `, [obj.nombre, obj.matricula, obj.id]);
}

exports.eliminarTransportista = id => {
    return db(`
        UPDATE transportista SET borrado = 1 WHERE id = ?;
    `, [id]);
}
