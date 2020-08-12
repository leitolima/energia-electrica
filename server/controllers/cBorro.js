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
    const {id} = req.params;
    const data = await mBorro.getRegistroToDel(id);
    const {id_tabla, tabla, central, id_centrales_fk} = data[0];
    let result1;
    if(central == 1){
        result1 = await mBorro.restaurarEnTabla(id_centrales_fk, 'centrales');
    } else {
        result1 = await mBorro.restaurarEnTabla(id_tabla, tabla);
    }
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
    const {id} = req.params;
    const data = await mBorro.getRegistroToDel(id);
    const {tabla, id_tabla, central, id_centrales_fk} = data[0];
    let result1, result2;
    result1 = await mBorro.eliminarDeTabla(tabla, id_tabla);
    if(central == 1){
        await mBorro.eliminarDeCentrales(id_centrales_fk);
    }
    result2 = await mBorro.eliminarDeBorro(id);
    if(result1.affectedRows && result2.affectedRows){
        return res.send({
            type: "success",
            title: "Éxito",
            text: "Registro eliminado permanentemente"
        })
    } return returnError(res);
}