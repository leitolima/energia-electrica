const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT c.id, c.nombre, c.prod_media, c.prod_maxima,
        n.num_reactores, n.vol_plut_consum, n.vol_residuo,
        p.nombre AS nombreprov,
        DATE_FORMAT(c.fecha_func, '%d/%m/%Y') AS fecha_func
        FROM centrales c LEFT JOIN nuclear n ON n.id = c.id_central
        LEFT JOIN provincias p ON p.id = c.id_provincia_fk
        WHERE c.tipo_central_fk = 3 AND c.borrado = 0;
    `, []);
}

exports.getById = id => {
    return db(`
        SELECT c.id, c.nombre, c.prod_media, c.prod_maxima, c.id_central,
        n.num_reactores, n.vol_plut_consum, n.vol_residuo,
        p.id AS provincia, c.fecha_func
        FROM centrales c LEFT JOIN nuclear n ON n.id = c.id_central
        LEFT JOIN provincias p ON p.id = c.id_provincia_fk
        WHERE c.id = ? AND c.tipo_central_fk = 3;
    `, [id]);
}

exports.registrarEnNuclear = obj => {
    return db(`
        INSERT INTO nuclear (num_reactores, vol_plut_consum, vol_residuo)
        VALUES (?, ?, ?);
    `, [obj.num_reactores, obj.vol_plut_consum, obj.vol_residuo]);
}
exports.registrarEnCentrales = (obj, id) => {
    return db(`
        INSERT INTO centrales (nombre, prod_media, prod_maxima, 
            fecha_func, id_central, tipo_central_fk, id_provincia_fk)
        VALUES (?, ?, ?, ?, ?, 3, ?);
    `, [obj.nombre, obj.prod_media, obj.prod_maxima, obj.fecha_func, id, obj.provincia]);
}

exports.editarEnNuclear = obj => {
    return db(`
        UPDATE nuclear SET num_reactores = ?, vol_plut_consum = ?,
        vol_residuo = ? WHERE id = ?;
    `, [obj.num_reactores, obj.vol_plut_consum, obj.vol_residuo, obj.id_central]);
}
exports.editarEnCentrales = obj => {
    return db(`
        UPDATE centrales SET nombre = ?, prod_media = ?,
        prod_maxima = ?, fecha_func = ?, id_provincia_fk = ? WHERE id = ?;
    `, [obj.nombre, obj.prod_media, obj.prod_maxima, obj.fecha_func, obj.provincia, obj.id])
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