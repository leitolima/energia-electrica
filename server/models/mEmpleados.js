const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT e.id, e.nombre, DATE_FORMAT(e.fecha_nac, '%d/%m/%Y') AS fecha,
        e.dni, e.email, e.telefono, c.nombre AS nomcentral, e.id_central_fk AS central
        FROM empleados e
        LEFT JOIN centrales c ON c.id = e.id_central_fk
        WHERE e.borrado = 0;
    `, []);
}

exports.getAllSinUsuario = () => {
    return db(`
        SELECT * FROM empleados WHERE id NOT IN
        (SELECT id_empleado_fk FROM usuarios WHERE borrado = 0);
    `, []);
}

exports.agregarNuevo = obj => {
    return db(`
        INSERT INTO empleados (nombre, fecha_nac, dni, email, telefono, id_central_fk)
        VALUES (?, ?, ?, ?, ?, ?);
    `, [obj.nombre, obj.fecha, obj.dni, obj.email, obj.telefono, obj.central]);
}

exports.getNombre = id => {
    return db(`
        SELECT nombre FROM empleados WHERE id = ?
    `, [id]);
}

exports.getById = id => {
    return db(`
        SELECT *, ifnull(telefono, '') AS telefono,
        id_central_fk AS central
        FROM empleados WHERE id = ?
    `, [id]);
}

exports.editarEmpleado = obj => {
    return db(`
        UPDATE empleados SET
        nombre = ?,
        fecha_nac = ?,
        dni = ?,
        email = ?,
        telefono = ?,
        id_central_fk = ?
        WHERE id = ?
    `, [obj.nombre, obj.fecha, obj.dni, obj.email, obj.telefono, obj.central, obj.id]);
}

exports.revisarUsuario = (id) => {
    return db(`
        SELECT id FROM usuarios WHERE id_empleado_fk = ? AND borrado = 0;
    `, [id]);
}
exports.eliminarEmpleado = id => {
    return db(`
        UPDATE empleados SET borrado = 1 WHERE id = ?
    `, [id])
}