const mSubestaciones = require('../models/mSubestaciones');
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
    const result = await mSubestaciones.getAll();
    res.send(result);
}

exports.getById = async (req, res) => {
    const result = await mSubestaciones.getById(req.params.id);
    res.send(result);
}

exports.agregarNueva = async (req, res) => {
    const result = await mSubestaciones.registrarNuevaSubestacion(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Subestacion registrada correctamente');
    } return returnError(res);
}

exports.editarSubestacion = async (req, res) => {
    const result = await mSubestaciones.editarSubestacion(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Subestacion actualizada correctamente');
    } return returnError(res);
}

exports.eliminarSubestacion = async (req, res) => {
    const {id} = req.params;
    const result = await mSubestaciones.eliminarSubestacion(id);
    const nombre = await mSubestaciones.getById(id);
    await mBorro.nuevoBorrado(req.usuario, 
        `Borro una subestacion: ${nombre[0].numero_red_sec}`, 'subestaciones', id
    );
    if(result.affectedRows){
        return returnExito(res, 'Subestacion eliminada correctamente');
    } return returnError(res);
}