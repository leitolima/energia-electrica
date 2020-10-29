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

exports.modificarConsumidores = obj => {
    return db(`
        UPDATE consumidores SET
        particulares = ?,
        empresas = ?,
        instituciones = ?
        WHERE id = ?
    `, [obj.particulares,obj.empresas,obj.instituciones,obj.id]);
}

exports.getByZona = id => {
    return db(`
        SELECT * FROM consumidores
        WHERE id_zona_fk = ? AND activa = 1
    `, [id])
}

exports.sumarTodos = () => {
    return db(`
        SELECT SUM(c.particulares) AS conparticulares,
        SUM(c.empresas) AS conempresas,
        SUM(c.instituciones) AS coninstituciones
        FROM consumidores c
        LEFT JOIN zonas_servicio z ON z.id = c.id_zona_fk
        WHERE z.borrado = 0;
    `, []);
}

exports.sumarCentrales = () => {
    return db(`
    SELECT 
    FROM consumidores c
    LEFT JOIN zonas_servicio z ON z.id = c.id_zona_fk
    WHERE z.borrado = 0;
`,[]);
}