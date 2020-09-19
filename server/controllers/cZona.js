const mZona = require('../models/mZona');
const mBorro = require('../models/mBorro');

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
    const {fprovincia} = req.body;
    const result = await mZona.getAll(fprovincia);
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
    const {id} = req.params;
    const result = await mZona.eliminarZona(id);
    const nombre = await mZona.getById(id);
    await mBorro.nuevoBorrado(req.usuario, 
        `Borro una zona de servicio: ${nombre[0].nombre}`, 'zonas_servicio', id
    );
    if(result.affectedRows){
        return returnExisto(res, 'Zona de servicio eliminada correctamente');
    } return returnError(res);
}