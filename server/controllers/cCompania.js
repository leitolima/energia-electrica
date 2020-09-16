const mCompania = require('../models/mCompania');
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
    
    const result = await mCompania.getAll();
    console.log(result);
    res.send(result);
}

exports.getById = async (req, res) => {
    const result = await mCompania.getById(req.params.id);
    res.send(result);
}

exports.agregarNueva = async (req, res) => {
    const result = await mCompania.registrarNuevaCompania(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Compañía registrada correctamente');
    } return returnError(res);
}

exports.editarCompania = async (req, res) => {
    const result = await mCompania.editarCompania(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Compañía actualizada correctamente');
    } return returnError(res);
} 

exports.eliminarCompania = async (req, res) => {
        const {id} = req.params;
        const result = await mCompania.eliminarCompania(id);
        if(result.affectedRows){
            return res.send({
                type: "success",
                title: "Éxito",
                text: "Compania eliminada correctamente"
            })
        } return returnError(res);
    } 
