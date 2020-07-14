const mUsuarios = require('../models/mUsuarios');

exports.agregarNuevoUsuario = async (req, res) => {
    const result = await mUsuarios.agregarNuevo(req.body);
    if(result.affectedRows){

    }
}

exports.editarUsuario = async (req, res) => {
    const result = await mUsuarios.agregarNuevo(req.body);
    if(result.affectedRows){

    }
}

exports.eliminarUsuario = async (req, res) => {
    const {id} = req.params;
    const result = await mUsuarios.eliminarUsuario(id);
    if(result.affectedRows);
}