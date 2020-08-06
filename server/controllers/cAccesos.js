const mAccesos = require('../models/mAccesos');

exports.getAccesosById = async (req, res) => {
    const {id} = req.params;
    const usuario = await mAccesos.getNombreUsuario(id);
    const accesos = await mAccesos.getPermisosDeUsuario(id);
    res.send({usuario, accesos});
}

exports.actualizacionAccesos = async (req,res) => {
    const {user,accesos} = req.body;
    console.log(user);
    console.log(accesos);
    const userid = user.id;

    for(var i=0;i<accesos.length; i++){
        const result = await mAccesos.updateAcceso(accesos[i],userid);
        
    }
    return res.send({
        type: "success",
        title: "Éxito",
        text: `Se han actualizado los accesos de ${user.usuario}`
    });
}