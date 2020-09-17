const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT c.id, c.nombre, c.prod_media, c.prod_maxima,
        h.ocupacion, h.capacidad, h.num_turbinas,
        p.nombre AS nombreprov,
        DATE_FORMAT(c.fecha_func, '%d/%m/%Y') AS fecha_func
        FROM centrales c LEFT JOIN hidroelectrica h ON h.id = c.id_central
        LEFT JOIN provincias p ON p.id = c.id_provincia_fk
        WHERE c.tipo_central_fk = 4 AND c.borrado = 0;
    `, []);   
}

exports.getById = id => {
    return db(`
        SELECT c.id, c.nombre, c.prod_media, c.prod_maxima, c.id_central, 
        h.ocupacion, h.capacidad, h.num_turbinas,
        p.id AS provincia, c.fecha_func
        FROM centrales c LEFT JOIN hidroelectrica h ON h.id = c.id_central
        LEFT JOIN provincias p ON p.id = c.id_provincia_fk
        WHERE c.id = ? AND c.tipo_central_fk = 4;
    `, [id]);   
}

exports.registrarEnHidroelectrica = obj => {
    return db(`
        INSERT INTO hidroelectrica (ocupacion, capacidad, num_turbinas)
        VALUES (?, ?, ?);
    `, [obj.ocupacion, obj.capacidad, obj.num_turbinas]);   
}
exports.registrarEnCentrales = (obj, id) => {
    return db(`
        INSERT INTO centrales (nombre, prod_media, prod_maxima, 
            fecha_func, id_central, tipo_central_fk, id_provincia_fk)
        VALUES (?, ?, ?, ?, ?, 4, ?);
    `, [obj.nombre, obj.prod_media, obj.prod_maxima, obj.fecha_func, id, obj.provincia]);   
}

exports.editarEnHidroelectrica = obj => {
    return db(`
        UPDATE hidroelectrica SET ocupacion = ?, capacidad = ?,
        num_turbinas = ? WHERE id = ?;
    `, [obj.ocupacion, obj.capacidad, obj.num_turbinas, obj.id_central]);   
}
exports.editarEnCentrales = obj => {
    return db(`
        UPDATE centrales SET nombre = ?, prod_media = ?,
        prod_maxima = ?, fecha_func = ?, id_provincia_fk WHERE id = ?;
    `, [obj.nombre, obj.prod_media, obj.prod_maxima, obj.fecha_func, obj.provincia, obj.id]);   
}

exports.getNombre = id => {
    return db(`
        SELECT nombre, id_central FROM centrales WHERE id = ?;
    `, [id]);
}

exports.eliminarCentral = id => {
    return db(`
        UPDATE centrales SET borrado = 1 WHERE id = ?;
    `, [id]);   
}