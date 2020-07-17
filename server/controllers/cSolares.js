const mSolares = require('../models/mSolares');

const returnError = res => {
    return res.send({
        type: "error",
        title: "Error",
        text: "Hubo un error al procesar la solicitud"
    })
}

exports.getAll = async (req, res) => {
    const result = await mSolares.getAll();
    res.send(result);
}

exports.getById = async (req, res) => {
    
}

exports.agregarNueva = async (req, res) => {
    const result = await mSolares.registrarEnSolar(req.body);
    if(result.affectedRows){
        const id_central = result.insertId;
        const result2 = await mSolares.registrarEnCentrales(req.body, id_central);
        if(result2.affectedRows){
            return res.send({
                type: "success",
                title: "Éxito",
                text: "Central registrada correctamente"
            });
        }
    } return returnError(res);
}

exports.editarCentral = async (req, res) => {

}

exports.eliminarCentral = async (req, res) => {
    
}