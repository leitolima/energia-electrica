const mTransportista = require('../models/mTransportista');
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
    
    const result = await mTransportista.getAll();
    console.log(result);
    res.send(result);
}

exports.getById = async (req, res) => {
    const result = await mTransportista.getById(req.params.id);
    res.send(result);
}

exports.agregarNuevo = async (req, res) => {
    const result = await mTransportista.registrarNuevoTransportista(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Transportista registrado correctamente');
    } return returnError(res);
}

exports.editarTransportista = async (req, res) => {
    const result = await mTransportista.editarTransportista(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Transportista actualizada correctamente');
    } return returnError(res);
} 

exports.eliminarTransportista = async (req, res) => {
    const {id} = req.params;
    const result = await mTransportista.eliminarTransportista(id);
    const nombre = await mTransportista.getById(id);
    await mBorro.nuevoBorrado(req.usuario, 
        `Borro un transportista: ${nombre[0].nombre}`, 'transportista', id
    );
    if(result.affectedRows){
        return returnExito(res, 'Transportista eliminado correctamente');
    } return returnError(res);
} 
