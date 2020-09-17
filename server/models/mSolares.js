const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT c.id, c.nombre, c.prod_media, c.prod_maxima,
        s.sup_paneles, s.media_hs_sol, s.tipo_panel, p.nombre AS nombreprov,
        DATE_FORMAT(c.fecha_func, '%d/%m/%Y') AS fecha_func
        FROM centrales c LEFT JOIN solar s ON c.id_central = s.id
        LEFT JOIN provincias p ON p.id = c.id_provincia_fk
        WHERE c.tipo_central_fk = 1 AND c.borrado = 0;
    `, []);
}

exports.getById = id => {
    return db(`
        SELECT c.id, c.nombre, c.prod_media, c.prod_maxima, c.id_central, 
        s.sup_paneles, s.media_hs_sol, s.tipo_panel, 
        p.id AS provincia,
        c.fecha_func AS fecha_func
        FROM centrales c LEFT JOIN solar s ON c.id_central = s.id
        LEFT JOIN provincias p ON p.id = c.id_provincia_fk
        WHERE s.id = ? AND c.tipo_central_fk = 1;
    `, [id]);
}

exports.registrarEnSolar = obj => {
    return db(`
        INSERT INTO solar (sup_paneles, media_hs_sol, tipo_panel)
        VALUES (?, ?, ?);
    `, [obj.sup_paneles, obj.media_hs_sol, obj.tipo_panel]);
}
exports.registrarEnCentrales = (obj, id) => {
    return db(`
        INSERT INTO centrales (nombre, prod_media, prod_maxima, 
            fecha_func, id_central, tipo_central_fk, id_provincia_fk)
        VALUES (?, ?, ?, ?, ?, 1, ?);
    `, [obj.nombre, obj.prod_media, obj.prod_maxima, obj.fecha_func, id, obj.provincia]);
}

exports.editarEnSolar = obj => {
    return db(`
        UPDATE solar SET sup_paneles = ?, media_hs_sol = ?,
        tipo_panel = ? WHERE id = ?;
    `, [obj.sup_paneles, obj.media_hs_sol, obj.tipo_panel, obj.id_central]);
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
        UPDATE centrales SET borrado = 1 WHERE id = ?
    `, [id]);
}