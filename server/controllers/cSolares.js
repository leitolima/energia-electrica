const mSolares = require('../models/mSolares');

const returnError = res => {
    return res.send({
        type: "error",
        title: "Error",
        text: "Hubo un error al procesar la solicitud"
    })
}
const returnExisto = (res, text) => {
    return res.send({
        type: "success",
        title: "Éxito",
        text
    });
}

exports.getAll = async (req, res) => {
    const result = await mSolares.getAll();
    res.send(result);
}

exports.getById = async (req, res) => {
    const result = await mSolares.getById(req.params.id);
    res.send(result);
}

exports.agregarNueva = async (req, res) => {
    const result = await mSolares.registrarEnSolar(req.body);
    if(result.affectedRows){
        const id_central = result.insertId;
        const result2 = await mSolares.registrarEnCentrales(req.body, id_central);
        if(result2.affectedRows){
            return returnExisto(res, "Central registrada correctamente");
        }
    } return returnError(res);
}

exports.editarCentral = async (req, res) => {
    const result = await mSolares.editarEnSolar(req.body);
    const result2 = await mSolares.editarEnCentrales(req.body);
    if(result.affectedRows && result2.affectedRows){
        return returnExisto(res, "Central actualizada correctamente");
    } return returnError(res);
}

exports.eliminarCentral = async (req, res) => {
    const result = await mSolares.eliminarEnSolar(req.params.id);
    const result2 = await mSolares.eliminarEnCentrales(req.params.id);
    if(result.affectedRows && result2.affectedRows){
        return returnExisto(res, "Central eliminada correctamente");
    } return returnError(res);
}