const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT *, DATE_FORMAT(fecha, '%d/%m/%Y') AS fecha 
        FROM borro ORDER BY id;
    `, []);
}

exports.nuevoBorrado = (usuario, titulo, tabla, id) => {
    let fecha = new Date();
    fecha = fecha.toISOString().slice(0,10);
    return db(`
        INSERT INTO borro 
        (usuario, titulo, fecha, tabla, id_tabla)
        VALUES (?, ?, ?, ?, ?);
    `, [usuario, titulo, fecha, tabla, id])
}

//Restore
exports.restaurarEnTabla = (id_tabla, tabla) => {
    return db(`
        UPDATE ${tabla} SET borrado = 0;
    `, [id_tabla])
}

//Obtiene el id y la tabla de un registro
exports.getRegistroToDel = id => {
    return db(`
        SELECT tabla, id_tabla FROM borro WHERE id = ?;
    `, [id]);
}
//Elimina el registro de su tabla correspondiente
exports.eliminarDeTabla = (tabla, id) => {
    return db(`
        DELETE FROM ${tabla} WHERE id = ?;
    `, [id]);
}
//Elimina el registro de la tabla borro
exports.eliminarDeBorro = id => {
    return db(`
        DELETE FROM borro WHERE id = ?;
    `, [id]);
}