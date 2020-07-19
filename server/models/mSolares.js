const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT s.*, c.nombre, c.prod_media, c.prod_maxima,
        DATE_FORMAT(c.fecha_func, '%m/%d/%Y') AS fecha_func
        FROM solar s LEFT JOIN centrales c ON c.id_central = s.id
    `, []);
}

exports.getById = id => {
    return db(`
        SELECT s.*, c.nombre, c.prod_media, c.prod_maxima, 
        c.fecha_func AS fecha
        FROM solar s LEFT JOIN centrales c ON c.id_central = s.id
        WHERE s.id = ?
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
            fecha_func, id_central, tipo_central_fk)
        VALUES (?, ?, ?, ?, ?, 1);
    `, [obj.nombre, obj.prod_media, obj.prod_maxima, obj.fecha, id]);
}

exports.editarEnSolar = obj => {
    return db(`
        UPDATE solar SET sup_paneles = ?, media_hs_sol = ?,
        tipo_panel = ? WHERE id = ?;
        
    `, [obj.sup_paneles, obj.media_hs_sol, obj.tipo_panel, obj.id]);
}
exports.editarEnCentrales = obj => {
    return db(`
        UPDATE centrales SET nombre = ?, prod_media = ?,
        prod_maxima = ?, fecha_func = ? WHERE id_central = ?;
    `, [obj.nombre, obj.prod_media, obj.prod_maxima, obj.fecha, obj.id])
}

exports.eliminarEnSolar = id => {
    return db(`
        DELETE FROM solar WHERE id = ?
    `, [id]);
}
exports.eliminarCentral = id => {
    return db(`
        DELETE FROM centrales WHERE id_central = ?
    `, [id]);
}