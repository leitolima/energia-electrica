const mNucleares = require('../models/mNucleares');
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
    const result = await mNucleares.getAll();
    res.send(result);
}

exports.getById = async (req, res) => {
    const result = await mNucleares.getById(req.params.id);
    res.send(result);
}

exports.agregarNueva = async (req, res) => {
    const result = await mNucleares.registrarEnNuclear(req.body);
    if(result.affectedRows){
        const id_central = result.insertId;
        const result2 = await mNucleares.registrarEnCentrales(req.body, id_central);
        if(result2.affectedRows){
            return returnExisto(res, "Central registrada correctamente");
        }
    } return returnError(res);
}

exports.editarCentral = async (req, res) => {
    const result = await mNucleares.editarEnNuclear(req.body);
    const result2 = await mNucleares.editarEnCentrales(req.body);
    if(result.affectedRows && result2.affectedRows){
        return returnExisto(res, "Central actualizada correctamente");
    } return returnError(res);
}

exports.eliminarCentral = async (req, res) => {
    const {id} = req.params;
    const result = await mNucleares.eliminarCentral(id);
    const nombre = await mNucleares.getNombre(id);
    await mBorro.nuevoBorradoCentral(req.usuario, 
        `Borro una central nuclear: ${nombre[0].nombre}`, 'nuclear', nombre[0].id_central, id
    );
    if(result.affectedRows){
        return returnExisto(res, "Central eliminada correctamente");
    } return returnError(res);
}