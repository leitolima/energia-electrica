const db = require('../db').db().query;

exports.cargarProducida = obj => {
    return db(`
        INSERT INTO energiaxd (id_usuario_fk, tipo_carga, id_central_fk, vol_energia, fecha_consumo)
        VALUES (1, 1, ?, ?, ?)
    `, [obj.pro_central, obj.pro_vol_energia, obj.pro_fecha_consumo])
}

exports.cargaConsumida = obj => {
    return db(`
        INSERT INTO energiaxd (id_usuario_fk, tipo_carga, vol_energia, fecha_carga, 
            fecha_consumo, id_zona_fk, id_consumidores_fk)
        VALUES (1, 2, ?, NOW(), ?, ?, ?);
    `, [obj.con_vol_energia, obj.con_fecha_consumo, obj.con_zona, obj.id_consumidores_fk]);
}