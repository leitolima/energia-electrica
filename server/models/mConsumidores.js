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

exports.getById = id => {
    return db(`
        SELECT z.*, p.nombre AS provincia,
        c.particulares, c.empresas, c.instituciones
        FROM zonas_servicio z
        LEFT JOIN consumidores c ON c.id_zona_fk = z.id
        LEFT JOIN provincias p ON p.id = z.id_provincia_fk
        WHERE z.id = ? AND c.activa = 1
    `, [id]);
}

exports.getConsumidores = id => {
    return db(`
        SELECT z.*, p.nombre AS provincia,
        c.particulares, c.empresas, c.instituciones
        FROM zonas_servicio z
        LEFT JOIN consumidores c ON c.id_zona_fk = z.id
        LEFT JOIN provincias p ON p.id = z.id_provincia_fk
        WHERE c.activa = 1
    `, [id])
}