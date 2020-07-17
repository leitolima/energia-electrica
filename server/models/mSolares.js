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
    
    `, [id]);
}

exports.registrarEnSolar = obj => {
    return db(`
        INSERT INTO solar (sup_paneles, media_hs_sol, tipo)
        VALUES (?, ?, ?);
    `, [obj.sup_paneles, obj.hs_sol, obj.tipo_panel]);
}
exports.registrarEnCentrales = (obj, id) => {
    return db(`
        INSERT INTO centrales (nombre, prod_media, prod_maxima, 
            fecha_func, id_central, tipo_central_fk)
        VALUES (?, ?, ?, ?, ?, 1);
    `, [obj.nombre, obj.prod_media, obj.prod_max, obj.fecha, id]);
}