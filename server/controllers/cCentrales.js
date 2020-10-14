const mCentrales = require('../models/mCentrales');

exports.getAll = async (req, res) => {
    const centrales = await mCentrales.getAll();
    res.send(centrales);
}

exports.getPorTipoNuclear = async (req, res) => {
    const result = await mCentrales.getPorTipoNuclear(req.params.id);
    res.send(result);
}