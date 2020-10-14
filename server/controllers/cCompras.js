const mCompras = require('../models/mCompras');
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
    
    const result = await mCompras.getAll();
    console.log(result);
    res.send(result);
}

exports.getById = async (req, res) => {
    const result = await mCompras.getById(req.params.id);
    res.send(result);
}

exports.agregarNueva = async (req, res) => {
    const result = await mCompras.registrarNuevaCompra(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Compra registrada correctamente');
    } return returnError(res);
}

exports.editarCompra = async (req, res) => {
    const result = await mCompras.editarCompra(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Compra actualizada correctamente');
    } return returnError(res);
} 

exports.eliminarCompra = async (req, res) => {
    const {id} = req.params;
    const result = await mCompras.eliminarCompra(id);
    const nombre = await mCompras.getById(id);
    await mBorro.nuevoBorrado(req.usuario, 
        `Borro un compra: ${nombre[0].nombre}`, 'compra', id
    );
    if(result.affectedRows){
        return returnExito(res, 'Compra eliminada correctamente');
    } return returnError(res);
} 
