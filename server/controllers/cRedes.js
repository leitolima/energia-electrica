const mRedes = require('../models/mRedes');
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