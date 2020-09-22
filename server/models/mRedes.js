const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT z.id, z.numero, e.nombre
        FROM redes z
        LEFT JOIN estaciones e ON z.id_estacion_fk = e.id
        WHERE z.borrado = 0;
    `, [])
}

exports.getById = id => {
    return db(`
        SELECT r.*, e.id AS estacion FROM redes r
        LEFT JOIN estaciones e ON e.id = r.id_estacion_fk
        WHERE r.id = ?
    `, [id])
}

exports.registrarNuevaRed = obj => {
    return db(`
        INSERT INTO redes (numero,id_estacion_fk)
        VALUES (?, ?);
    `, [obj.numero, obj.estacion]);
}

exports.editarRed = obj => {
    return db(`
        UPDATE redes SET
        numero = ?, id_estacion_fk = ?
        WHERE id = ?;
    `, [obj.numero, obj.estacion, obj.id]);
}

exports.eliminarRed = id => {
    return db(`
        UPDATE redes SET borrado = 1 WHERE id = ?;
    `, [id]);
}