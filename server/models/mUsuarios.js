const db = require('../db').db().query;

exports.agregarNuevo = (obj) => {
    return db(`
        INSERT INTO usuarios (usuario, clave, id_empleado_fk)
        VALUES (?, ?, ?);
    `, [obj.usuario, obj.clave, obj.empleado]);
}

exports.editarUsuario = (obj) => {
    return db(`
        UPDATE usuarios SET
        usuario = ?,
        clave = ?,
        id_empleado_fk = ?,
        activo = ?
        WHERE id = ?
    `, [obj.usuario, obj.clave, obj.empleado, obj.activo, obj.id]);
}

exports.eliminarUsuario = (id) => {
    return db(`
        DELETE FROM usuarios WHERE id = ?
    `, [id])
}