const mTransformadores = require('../models/mTransformadores');
const mEstaciones = require('../models/mEstaciones');
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
    const transformadores = await mTransformadores.getAll();
    res.send(transformadores);
}

exports.getById = async (req, res) => {
    const transformador = await mTransformadores.getById(req.params.id);
    res.send(transformador);
}

exports.agregarNuevo = async (req, res) => {
    const result = await mTransformadores.registrarNuevoTransformador(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Transformador registrado correctamente');
    } return returnError(res);
}

exports.editarTransformador = async (req, res) => {
    const result = await mTransformadores.editarTransformador(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Transformador actualizado correctamente');
    } return returnError(res);
}

exports.eliminarTransformador = async (req, res) => {
    const {id} = req.params;
    const result = await mTransformadores.eliminarTransformador(id);
    await mBorro.nuevoBorrado(req.usuario, 
        `Borro un transformador id: #${id}`, 'transformadores', id
    );
    if(result.affectedRows){
        return returnExisto(res, 'Transformador eliminado correctamente');
    } return returnError(res);
}