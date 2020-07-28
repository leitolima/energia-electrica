const db = require('../db').db().query;

exports.getNombreUsuario = id => {
    return db(`
        SELECT u.usuario, e.nombre FROM usuarios u
        LEFT JOIN empleados e ON u.id_empleado_fk = e.id
        WHERE u.id = ?
    `, [id]);
}

exports.getPermisosDeUsuario = id => {
    return db(`
        SELECT ay.*, ac.a, ac.b, ac.m, ac.c FROM ayuda ay
        LEFT JOIN accesos ac ON ay.menu = ac.menu_ayuda_fk
        WHERE ac.id_usuario_fk = ?
    `, [id]);
}