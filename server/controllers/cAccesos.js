const mAccesos = require('../models/mAccesos');

exports.getAccesosById = async (req, res) => {
    const {id} = req.params;
    const usuario = await mAccesos.getNombreUsuario(id);
    const accesos = await mAccesos.getPermisosDeUsuario(id);
    res.send({usuario, accesos});
}