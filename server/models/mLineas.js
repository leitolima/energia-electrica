const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT *, numero_red_sec AS numero FROM lineas
        WHERE borrado = 0;
    `, []);
}

exports.getById = id => {
    return db(`
        SELECT *, numero_red_sec AS numero FROM lineas
        WHERE id = ?;
    `, [id]);
}

exports.agregarNueva = obj => {
    return db(`
        INSERT INTO lineas (numero_red_sec, longitud)
        VALUES (?, ?)
    `, [obj.numero, obj.longitud]);
}

exports.editarLinea = obj => {
    return db(`
        UPDATE lineas SET
        numero_red_sec = ?, 
        longitud = ?
        VALUES (?, ?)
    `, [obj.numero, obj.longitud]);
}

exports.eliminarLinea = id => {
    return db(`
        UPDATE lineas SET borrado = 1
        WHERE id = ?
    `, [id]);
}