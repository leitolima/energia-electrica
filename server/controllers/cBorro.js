const mBorro = require('../models/mBorro');

const returnError = res => {
    return res.send({
        type: "error",
        title: "Error",
        text: "Hubo un error al procesar la solicitud"
    })
}

exports.getAll = async (req, res) => {
    const result = await mBorro.getAll();
    res.send(result);
}

exports.verRegistro = async (req, res) => {
    
}

exports.restaurarRegistro = async (req, res) => {
    const {id, id_tabla, tabla} = req.params;
    const result1 = await mBorro.restaurarEnTabla(id_tabla, tabla);
    const result2 = await mBorro.eliminarDeBorro(id);
    if(result1.affectedRows && result2.affectedRows){
        return res.send({
            type: "success",
            title: "Éxito",
            text: "Registro restaurado correctamente"
        })
    } return returnError(res);
}

exports.eliminarRegistro = async (req, res) => {
    const row = await mBorro.getRegistroToDel(req.params.id);
    const {tabla, id_tabla} = row[0];
    const result1 = await mBorro.eliminarDeTabla(tabla, id_tabla);
    const result2 = await mBorro.eliminarDeBorro(req.params.id);
    if(result1.affectedRows && result2.affectedRows){
        return res.send({
            type: "success",
            title: "Éxito",
            text: "Registro eliminado permanentemente"
        })
    } return returnError(res);
}