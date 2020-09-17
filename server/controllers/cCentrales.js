const mCentrales = require('../models/mCentrales');

exports.getAll = async (req, res) => {
    const centrales = await mCentrales.getAll();
    res.send(centrales);
}