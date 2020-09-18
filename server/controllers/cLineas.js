const mLineas = require('../models/mLineas');
const mBorro = require('../models/mBorro');

const returnError = res => {
    return res.send({
        type: "error",
        title: "Error",
        text: "Hubo un error al procesar la solicitud"
    })
}
const returnExito = (res, text) => {
    return res.send({
        type: "success",
        title: "Éxito",
        text
    });
}

exports.getAll = async (req, res) => {
    const lineas = await mLineas.getAll();
    res.send(lineas);
}

exports.getById = async (req, res) => {
    const result = await mLineas.getById(req.params.id);
    res.send(result);
}

exports.agregarNueva = async (req, res) => {
    const result = await mLineas.agregarNueva(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Linea registrada correctamente');
    } return returnError(res);
}

exports.editarLinea = async (req, res) => {
    const result = await mLineas.editarLinea(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Linea actualizada correctamente');
    } return returnError(res);
}

exports.eliminarLinea = async (req, res) => {
    const {id} = req.params;
    const result = await mLineas.eliminarLinea(id);
    const numero = await mLineas.getById(id);
    if(result.affectedRows){
        await mBorro.nuevoBorrado(req.usuario,
            `Borro una linea: ${numero[0].numero}`, 'lineas', id
        );
        return returnExito(res, 'Linea eliminada correctamente');
    } return returnError(res);
}