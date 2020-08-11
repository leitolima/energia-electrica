const db = require('../db').db().query;

exports.getAll = () => {
    return db(`
        SELECT u.id, u.usuario, u.activo,
        e.nombre, n.titulo AS nivel
        FROM usuarios u
        LEFT JOIN empleados e ON e.id = u.id_empleado_fk
        LEFT JOIN niveles n ON n.id = u.id_nivel_fk
        WHERE u.borrado = 0;
    `, []);
}

exports.agregarNuevo = obj => {
    return db(`
        INSERT INTO usuarios (usuario, clave, id_empleado_fk, id_nivel_fk)
        VALUES (?, ?, ?, ?);
    `, [obj.usuario, obj.clave, obj.empleado, obj.nivel]);
}

exports.getNombre = id => {
    return db(`
        SELECT usuario FROM usuarios WHERE id = ?
    `, [id]);
}

exports.getById = id => {
    return db(`
        SELECT u.id, u.usuario, u.clave, u.activo,
        e.nombre, n.id AS nivel, e.id AS empleado
        FROM usuarios u
        LEFT JOIN empleados e ON e.id = u.id_empleado_fk
        LEFT JOIN niveles n ON n.id = u.id_nivel_fk
        WHERE u.id = ?
    `, [id]);
}

exports.editarUsuario = obj => {
    return db(`
        UPDATE usuarios SET
        usuario = ?,
        id_empleado_fk = ?,
        id_nivel_fk = ?,
        activo = ?
        WHERE id = ?
    `, [obj.usuario, obj.empleado, obj.nivel, obj.activo, obj.id]);
}

exports.eliminarUsuario = (id) => {
    return db(`
        UPDATE usuarios SET borrado = 1 WHERE id = ?
    `, [id])
}