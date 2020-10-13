const db = require('../db').db().query;

exports.cargarConsumidores = (fecha, id_zona, particulares, empresas, instituciones) => {
    return db(`
        INSERT INTO consumidores (fecha, id_zona_fk, particulares, empresas, instituciones)
        VALUES (?, ?, ?, ?, ?);
    `, [fecha, id_zona, particulares, empresas, instituciones]);
}

exports.cambiarActiva = id => {
    return db(`
        UPDATE consumidores SET activa = 0
        WHERE id = ?
    `, [id]);
}

exports.getConsumidores = id => {
    return db(`
        SELECT * FROM consumidores WHERE id = ?
    `, [id])
}