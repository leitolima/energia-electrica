const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT h.*, c.nombre, c.prod_media, c.prod_maxima,
        DATE_FORMAT(c.fecha_func, '%m/%d/%Y') AS fecha_func
        FROM hidroelectrica h LEFT JOIN centrales c ON c.id_central = h.id
        WHERE c.tipo_central_fk = 4 AND c.borrado = 0;
    `, []);   
}

exports.getById = id => {
    return db(`
        SELECT h.*, c.nombre, c.prod_media, c.prod_maxima, 
        c.fecha_func AS fecha
        FROM hidroelectrica h LEFT JOIN centrales c ON c.id_central = h.id
        WHERE h.id = ? AND c.tipo_central_fk = 4;
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
            fecha_func, id_central, tipo_central_fk)
        VALUES (?, ?, ?, ?, ?, 4);
    `, [obj.nombre, obj.prod_media, obj.prod_maxima, obj.fecha, id]);   
}

exports.editarEnHidroelectrica = obj => {
    return db(`
        UPDATE hidroelectrica SET ocupacion = ?, capacidad = ?,
        num_turbinas = ? WHERE id = ?;
    `, [obj.ocupacion, obj.capacidad, obj.num_turbinas, obj.id]);   
}
exports.editarEnCentrales = obj => {
    return db(`
        UPDATE centrales SET nombre = ?, prod_media = ?,
        prod_maxima = ?, fecha_func = ? WHERE id_central = ?;
    `, [obj.nombre, obj.prod_media, obj.prod_maxima, obj.fecha, obj.id]);   
}

exports.eliminarEnHidroelectrica = id => {
    return db(`
        DELETE FROM hidroelectrica WHERE id = ?
    `, [id]);   
}
exports.eliminarEnCentrales = id => {
    return db(`
        DELETE FROM centrales WHERE id_central = ?
    `, [id]);   
}