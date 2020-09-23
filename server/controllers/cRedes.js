const mRedes = require('../models/mRedes');
const mBorro = require('../models/mBorro');
const mCompania = require('../models/mCompania');

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
    const result = await mRedes.getAll();
    if(result.length > 0 ){
        return res.send(result)
    }
    return res.send({type: 'notfound'})
    
}

exports.getById = async (req, res) => {
    const result = await mRedes.getById(req.params.id);
    res.send(result);
}

exports.agregarNueva = async (req, res) => {
    const result = await mRedes.registrarNuevaRed(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Red registrada correctamente');
    } return returnError(res);
}

exports.editarRed = async (req, res) => {
    const result = await mRedes.editarRed(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Red actualizada correctamente');
    } return returnError(res);
}


exports.eliminarRed = async (req, res) => {
    const {id} = req.params;
    const result = await mRedes.eliminarRed(id);
    await mBorro.nuevoBorrado(req.usuario, 
        `Borro un red id: #${id}`, 'redes', id
    );
    if(result.affectedRows){
        return returnExito(res, 'Red eliminado correctamente');
    } return returnError(res);
}

exports.getPropietarios = async (req, res) => {
    const {idred} = req.body;
    const propietarios = await mCompania.getPropietariosDeRed(idred);
    res.send(propietarios);
}

exports.agregarPropietario = async (req, res) => {
    const {compania, red} = req.body;
    const result = await mRedes.agregarPropietario(red, compania);
    if(result.affectedRows){
        return returnExito(res, 'Propietario agregado correctamente');
    } return returnError(res);
}

exports.eliminarPropietario = async (req, res) => {
    const {idred, idcompania} = req.params;
    const result = await mRedes.eliminarPropietario(idred, idcompania);
    if(result.affectedRows){
        return returnExito(res, 'Propietario eliminado correctamente');
    } return returnError(res);
}