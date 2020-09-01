const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT id, nombre, DATE_FORMAT(fecha_nac, '%d/%m/%Y') AS fecha,
        dni, email, telefono FROM empleados
        WHERE borrado = 0;
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
        INSERT INTO empleados (nombre, fecha_nac, dni, email, telefono)
        VALUES (?, ?, ?, ?, ?);
    `, [obj.nombre, obj.fecha, obj.dni, obj.email, obj.telefono]);
}

exports.getNombre = id => {
    return db(`
        SELECT nombre FROM empleados WHERE id = ?
    `, [id]);
}

exports.getById = id => {
    return db(`
        SELECT *, ifnull(telefono, '') AS telefono 
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
        telefono = ?
        WHERE id = ?
    `, [obj.nombre, obj.fecha, obj.dni, obj.email, obj.telefono, obj.id]);
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