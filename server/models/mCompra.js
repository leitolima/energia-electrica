const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT co.*, c.nombre AS central,
        s.nombre AS suministro
        FROM compra co
        LEFT JOIN centrales c ON c.id = co.central
        LEFT JOIN suministro s ON s.id = co.id_suministro_fk
        WHERE co.borrado = 0
    `, [])
}

exports.getById = id => {
    return db(`
        SELECT id, nombre,central, id_suministro_fk, pais, cant_plutonio 
        FROM compra WHERE id = ?
    `, [id])
}

exports.registrarNuevaCompra = obj => {
    return db(`
        INSERT INTO compra (central, id_suministro_fk, cant_plutonio)
        VALUES (?, ?, ?)
    `, [obj.central,obj.suministro,obj.cant_plutonio]);
}

exports.editarCompra = obj => {
    return db(`
        UPDATE compra SET
        central = ?,
        id_suministro_fk = ?,
        cant_plutonio = ?
        WHERE id = ?
    `, [obj.central,obj.suministro,obj.cant_plutonio,obj.id]);
}

exports.eliminarCompra = id => {
    return db(`
        UPDATE compra SET borrado = 1 WHERE id = ?;
    `, [id]);
}
