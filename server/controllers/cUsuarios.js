const mAccesos = require('../models/mAccesos');
const mUsuarios = require('../models/mUsuarios');
const mBorro = require('../models/mBorro');

const returnError = res => {
    return res.send({
        type: "error",
        title: "Error",
        text: "Hubo un error al procesar la solicitud"
    })
}

exports.getAll = async (req, res) => {
    const result = await mUsuarios.getAll(req.body.fcentral);
    res.send(result);
}

exports.getById = async (req, res) => {
    const result = await mUsuarios.getById(req.params.id);
    res.send(result);
}

exports.agregarNuevoUsuario = async (req, res) => {
    const result = await mUsuarios.agregarNuevo(req.body);
    const idUsuario = result.insertId;
    const nivel = req.body.nivel;
    asignacionAccesos(idUsuario,nivel);
    if(result.affectedRows){
        return res.send({
            type: "success",
            title: "Éxito",
            text: "Usuario registrado correctamente"
        })
    } return returnError(res);
}

exports.editarUsuario = async (req, res) => {
    const result = await mUsuarios.editarUsuario(req.body);
    if(result.affectedRows){
        return res.send({
            type: "success",
            title: "Éxito",
            text: "Usuario actualizado correctamente"
        })
    } return returnError(res);
}

exports.eliminarUsuario = async (req, res) => {
    const {id} = req.params;
    const result = await mUsuarios.eliminarUsuario(id);
    const nombre = await mUsuarios.getNombre(id);
    if(result.affectedRows){
        await mBorro.nuevoBorrado(req.usuario, `Borro un usuario: ${nombre[0].usuario}`, 'usuarios', id);
        return res.send({
            type: "success",
            title: "Éxito",
            text: "Usuario eliminado correctamente"
        })
    } return returnError(res);
}

async function asignacionAccesos(id,nivel){
    const result = await mAccesos.getMenu();
    for(var i=0;i<result.length;i++){
        //Admin 
        if(nivel === 1){
            await mAccesos.agregarAccesos(id, result[i].menu, 1, 1, 1, 1);
        }
        //Supervisor
        if(nivel === 2){
            await mAccesos.agregarAccesos(id, result[i].menu, 1, 0, 1, 1);
        }
        //Empleado
        if(nivel === 3){
            await mAccesos.agregarAccesos(id, result[i].menu, 0, 0, 0, 1);
        }
    }
}

