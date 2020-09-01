const mEstaciones = require('../models/mEstaciones');
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
    
    const result = await mEstaciones.getAll();
    console.log(result);
    res.send(result);
}

exports.getById = async (req, res) => {
    const result = await mEstaciones.getById(req.params.id);
    res.send(result);
}

exports.agregarNueva = async (req, res) => {
    const result = await mEstaciones.registrarNuevaEstacion(req.body);
    if(result.affectedRows){
        return returnExisto(res, 'Estacion registrada correctamente');
    } return returnError(res);
}

exports.editarEstacion = async (req, res) => {
    const result = await mEstaciones.editarEstacion(req.body);
    if(result.affectedRows){
        return returnExisto(res, 'Estacion actualizada correctamente');
    } return returnError(res);
}

exports.eliminarEstacion = async (req, res) => {
    const {id} = req.params;
    const result = await mEstaciones.eliminarEstacion(id);
    const nombre = await mEstaciones.getById(id);
    await mBorro.nuevoBorrado(req.usuario, 
        `Borro una zona de servicio: ${nombre[0].nombre}`, 'estaciones', id
    );
    if(result.affectedRows){
        return returnExisto(res, 'Estacion eliminada correctamente');
    } return returnError(res);
}