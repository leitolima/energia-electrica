const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT t.*, c.nombre, c.prod_media, c.prod_maxima,
        DATE_FORMAT(c.fecha_func, '%m/%d/%Y') AS fecha_func
        FROM termica t LEFT JOIN centrales c ON c.id_central = t.id
        WHERE c.tipo_central_fk = 2 AND c.borrado = 0;
    `, []);   
}

exports.getById = id => {
    return db(`
        SELECT t.*, c.nombre, c.prod_media, c.prod_maxima, 
        c.fecha_func AS fecha
        FROM termica t LEFT JOIN centrales c ON c.id_central = t.id
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
    `, [obj.num_hornos, obj.vol_carbon_consum, obj.vol_emision_gases, obj.id]);   
}
exports.editarEnCentrales = obj => {
    return db(`
        UPDATE centrales SET nombre = ?, prod_media = ?,
        prod_maxima = ?, fecha_func = ? WHERE id_central = ?;
    `, [obj.nombre, obj.prod_media, obj.prod_maxima, obj.fecha, obj.id]);   
}

exports.eliminarEnTermica = id => {
    return db(`
        DELETE FROM termica WHERE id = ?
    `, [id]);   
}
exports.eliminarEnCentrales = id => {
    return db(`
        DELETE FROM centrales WHERE id_central = ?
    `, [id]);   
}