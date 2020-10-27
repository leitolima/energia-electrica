const mConsumidores = require('../models/mConsumidores');

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
    const consumidores = await mConsumidores.getConsumidores();
    res.send(consumidores);
}

exports.getById = async (req, res) => {
    const {id} = req.params;
    const result = await mConsumidores.getById(id);
    res.send(result);
}

exports.updateConsumidores = async (req, res) => {
    const result = await mConsumidores.modificarConsumidores(req.body);
    if(result.affectedRows){
        return returnExito(res, 'Actualizado correctamente');
    } return returnError(res);
}