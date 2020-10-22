const mConsumidores = require('../models/mConsumidores');

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
    
}