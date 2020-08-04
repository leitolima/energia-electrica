const mZona = require('../models/mZona');

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
    const result = await mZona.getAll();
    res.send(result);
}

exports.getById = async (req, res) => {
    const result = await mZona.getById(req.params.id);
    res.send(result);
}

exports.agregarNueva = async (req, res) => {
    const result = await mZona.registrarNuevaZona(req.body);
    if(result.affectedRows){
        return returnExisto(res, 'Zona registrada correctamente');
    } return returnError(res);
}

exports.editarZona = async (req, res) => {
    const result = await mZona.editarZona(req.body);
    if(result.affectedRows){
        return returnExisto(res, 'Zona de servicio actualizada correctamente');
    } return returnError(res);
}

exports.eliminarZona = async (req, res) => {
    const result = await mZona.eliminarZona(req.params.id);
    if(result.affectedRows){
        return returnExisto(res, 'Zona de servicio eliminada correctamente');
    } return returnError(res);
}