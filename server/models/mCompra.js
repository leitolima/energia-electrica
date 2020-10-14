const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT *
        FROM compra 
        WHERE borrado = 0;
    `, [])
}

exports.getById = id => {
    return db(`
        SELECT id, nombre,central,pais, cant_plutonio 
        FROM compra WHERE id = ?
    `, [id])
}

exports.registrarNuevaCompra = obj => {
    return db(`
        INSERT INTO compra (nombre, central, pais, cant_plutonio)
        VALUES (?,?)
    `, [obj.nombre,obj.central],obj.pais,obj.cant);
}

exports.editarCompra = obj => {
    return db(`
        UPDATE compra SET
        nombre = ?, matricula = ?
        WHERE id = ?
    `, [obj.nombre, obj.matricula, obj.id]);
}

exports.eliminarCompra = id => {
    return db(`
        UPDATE compra SET borrado = 1 WHERE id = ?;
    `, [id]);
}
