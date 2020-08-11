const mProvincias = require('../models/mProvincias');
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
    const result = await mProvincias.getAll();
    if(result.length > 0 ){
        return res.send(result)
    }
    return res.send({type: 'notfound'})
    
}

exports.getById = async (req, res) => {
    const result = await mProvincias.getById(req.params.id);
    res.send(result);
}

exports.agregarNueva = async (req, res) => {
    const result = await mProvincias.registrarNuevaProvincia(req.body);
    if(result.affectedRows){
        return returnExisto(res, 'Provincia registrada correctamente');
    } return returnError(res);
}

exports.editarProvincia = async (req, res) => {
    const result = await mProvincias.editarProvincia(req.body);
    if(result.affectedRows){
        return returnExisto(res, 'Provincia actualizada correctamente');
    } return returnError(res);
}

exports.eliminarProvincia = async (req, res) => {
    const {id} = req.params;
    const result = await mProvincias.eliminarProvincia(id);
    const nombre = await mProvincias.getById(id);
    if(result.affectedRows){
        await mBorro.nuevoBorrado(req.usuario, 
            `Borro una provincia: ${nombre[0].nombre} (${nombre[0].codigo})`, 'provincias', id
        );
        return returnExisto(res, 'Provincia eliminada correctamente');
    } return returnError(res);
}