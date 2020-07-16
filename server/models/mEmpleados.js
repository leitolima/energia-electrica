const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT * FROM empleados
    `, []);
}

exports.getAllSinUsuario = () => {
    return db(`
        SELECT * FROM empleados WHERE id NOT IN
        (SELECT id_empleado_fk FROM usuarios);
    `, []);
}

exports.agregarNuevo = obj => {
    return db(`
        INSERT INTO empleados (nombre, fecha_nac, dni, email, telefono)
        VALUES (?, ?, ?, ?, ?);
    `, [obj.nombre, obj.fecha, obj.dni, obj.email, obj.telefono]);
}

exports.editarEmpleado = obj => {
    return db(`
        UPDATE empleados SET
        nombre = ?,
        fecha_nac = ?,
        dni = ?,
        email = ?
        telefono = ?
        WHERE id = ?
    `, [obj.nombre, obj.fecha_nac, obj.dni, obj.email, obj.telefono, obj.id]);
}

exports.eliminarEmpleado = id => {
    return db(`
        DELETE FROM empleados WHERE id = ?
    `, [id])
}