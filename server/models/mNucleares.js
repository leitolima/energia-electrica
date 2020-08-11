const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT n.*, c.nombre, c.prod_media, c.prod_maxima,
        DATE_FORMAT(c.fecha_func, '%m/%d/%Y') AS fecha_func
        FROM nuclear n LEFT JOIN centrales c ON c.id_central = n.id
        WHERE c.tipo_central_fk = 3 AND c.borrado = 0;
    `, []);
}

exports.getById = id => {
    return db(`
        SELECT n.*, c.nombre, c.prod_media, c.prod_maxima, 
        c.fecha_func AS fecha
        FROM nuclear n LEFT JOIN centrales c ON c.id_central = n.id
        WHERE n.id = ? AND c.tipo_central_fk = 3;
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
            fecha_func, id_central, tipo_central_fk)
        VALUES (?, ?, ?, ?, ?, 3);
    `, [obj.nombre, obj.prod_media, obj.prod_maxima, obj.fecha, id]);
}

exports.editarEnNuclear = obj => {
    return db(`
        UPDATE nuclear SET num_reactores = ?, vol_plut_consum = ?,
        vol_residuo = ? WHERE id = ?;
        
    `, [obj.num_reactores, obj.vol_plut_consum, obj.vol_residuo, obj.id]);
}
exports.editarEnCentrales = obj => {
    return db(`
        UPDATE centrales SET nombre = ?, prod_media = ?,
        prod_maxima = ?, fecha_func = ? WHERE id_central = ?;
    `, [obj.nombre, obj.prod_media, obj.prod_maxima, obj.fecha, obj.id])
}

exports.eliminarEnNuclear = id => {
    return db(`
        DELETE FROM nuclear WHERE id = ?
    `, [id]);
}
exports.eliminarEnCentrales = id => {
    return db(`
        DELETE FROM centrales WHERE id_central = ?
    `, [id]);
}