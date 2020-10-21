const mSuministro = require('../models/mSuministro');
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
    const result = await mSuministro.getAll();
    res.send(result);
}

exports.getById = async (req, res) => {
    const result = await mSuministro.getById(req.params.id);
    res.send(result);
}

exports.agregarNueva = async (req, res) => {
    const result = await mSuministro.registrarNuevoSuministro(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Suministro registrado correctamente');
    } return returnError(res);
}

exports.editarSuministro = async (req, res) => {
    const result = await mSuministro.editarSuministro(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Suministro actualizado correctamente');
    } return returnError(res);
} 

exports.eliminarSuministro = async (req, res) => {
    const {id} = req.params;
    const result = await mSuministro.eliminarSuministro(id);
    const nombre = await mSuministro.getById(id);
    await mBorro.nuevoBorrado(req.usuario, 
        `Borro un Suministro: ${nombre[0].nombre}`, 'suministro', id
    );
    if(result.affectedRows){
        return returnExito(res, 'Suministro eliminado correctamente');
    } return returnError(res);
} 
