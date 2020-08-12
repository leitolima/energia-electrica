const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT c.id, c.nombre, c.prod_media, c.prod_maxima,
        t.num_hornos, t.vol_carbon_consum, t.vol_emision_gases,
        DATE_FORMAT(c.fecha_func, '%d/%m/%Y') AS fecha_func
        FROM centrales c LEFT JOIN termica t ON t.id = c.id_central
        WHERE c.tipo_central_fk = 2 AND c.borrado = 0;
    `, []);   
}

exports.getById = id => {
    return db(`
        SELECT c.id, c.nombre, c.prod_media, c.prod_maxima, c.id_central, 
        t.num_hornos, t.vol_carbon_consum, t.vol_emision_gases,
        DATE_FORMAT(c.fecha_func, '%d/%m/%Y') AS fecha_func
        FROM centrales c LEFT JOIN termica t ON t.id = c.id_central
        WHERE t.id = ? AND c.tipo_central_fk = 2;
    `, [id]);   
}

exports.registrarEnTermica = obj => {
    return db(`
        INSERT INTO termica (num_hornos, vol_carbon_consum, vol_emision_gases)
        VALUES (?, ?, ?);
    `, [obj.num_hornos, obj.vol_carbon_consum, obj.vol_emision_gases]);   
}
exports.registrarEnCentrales = (obj, id) => {
    return db(`
        INSERT INTO centrales (nombre, prod_media, prod_maxima, 
            fecha_func, id_central, tipo_central_fk)
        VALUES (?, ?, ?, ?, ?, 2);
    `, [obj.nombre, obj.prod_media, obj.prod_maxima, obj.fecha, id]);   
}

exports.editarEnTermica = obj => {
    return db(`
        UPDATE termica SET num_hornos = ?, vol_carbon_consum = ?,
        vol_emision_gases = ? WHERE id = ?;
    `, [obj.num_hornos, obj.vol_carbon_consum, obj.vol_emision_gases, obj.id_central]);   
}
exports.editarEnCentrales = obj => {
    return db(`
        UPDATE centrales SET nombre = ?, prod_media = ?,
        prod_maxima = ?, fecha_func = ? WHERE id = ?;
    `, [obj.nombre, obj.prod_media, obj.prod_maxima, obj.fecha, obj.id]);   
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