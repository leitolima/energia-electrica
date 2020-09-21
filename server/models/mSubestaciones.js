const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT s.*, l.numero_red_sec AS nrolinea,
        p.nombre AS nombreprov
        FROM subestaciones s
        LEFT JOIN lineas l ON l.id = s.id_linea_fk
        LEFT JOIN provincias p ON p.id = s.id_provincia_fk
        WHERE s.borrado = 0;
    `, [])
}

exports.getById = id => {
    return db(`
        SELECT s.id, s.id_linea_fk AS linea,
        s.id_provincia_fk AS provincia,
        l.numero_red_sec
        FROM subestaciones s
        LEFT JOIN lineas l ON l.id = s.id_linea_fk
        WHERE s.id= ?;
    `, [id])
}

exports.registrarNuevaSubestacion = obj => {
    return db(`
        INSERT INTO subestaciones (id_linea_fk, id_provincia_fk)
        VALUES (?, ?);
    `, [obj.linea, obj.provincia]);
}

exports.editarSubestacion = obj => {
    return db(`
        UPDATE subestaciones SET
        id_linea_fk = ?,
        id_provincia_fk = ?
        WHERE id = ?
    `, [obj.linea, obj.provincia, obj.id]);
}

exports.eliminarSubestacion = id => {
    return db(`
        UPDATE subestaciones SET borrado = 1 WHERE id = ?;
    `, [id]);
}