const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT z.id, z.nombre, p.nombre AS provincia 
        FROM zonas_servicio z
        LEFT JOIN provincias p ON z.id_provincia_fk = p.id
        WHERE z.borrado = 0;
    `, [])
}

exports.getById = id => {
    return db(`
        SELECT id, nombre, id_provincia_fk AS idprovincia 
        FROM zonas_servicio WHERE id = ?
    `, [id])
}

exports.registrarNuevaZona = obj => {
    return db(`
        INSERT INTO zonas_servicio (nombre, id_provincia_fk)
        VALUES (?, ?)
    `, [obj.nombre, obj.idprovincia]);
}

exports.editarZona = obj => {
    return db(`
        UPDATE zonas_servicio SET
        id_provincia_fk = ?, nombre = ?
        WHERE id = ?
    `, [obj.idprovincia, obj.nombre, obj.id]);
}

exports.eliminarZona = id => {
    return db(`
        UPDATE zonas_servicio SET borrado = 1 WHERE id = ?;
    `, [id]);
}