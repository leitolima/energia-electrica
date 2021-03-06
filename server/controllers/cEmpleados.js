const mEmpleados = require('../models/mEmpleados');
const mBorro = require('../models/mBorro');

const returnError = res => {
    return res.send({
        type: "error",
        title: "Error",
        text: "Hubo un error al procesar la solicitud"
    })
}

exports.getAll = async (req, res) => {
    const result = await mEmpleados.getAll();
    res.send(result);
}

exports.getById = async (req, res) => {
    const result = await mEmpleados.getById(req.params.id);
    res.send(result);
}

exports.getAllSinUsuario = async (req, res) => {
    const result = await mEmpleados.getAllSinUsuario();
    if(result.length === 0){
        return res.send({type: 'notfound'});
    }
    res.send(result);
}

exports.agregarNuevoEmpleado = async (req, res) => {
    const result = await mEmpleados.agregarNuevo(req.body);
    if(result.affectedRows){
        return res.send({
            type: "success",
            title: "Éxito",
            text: "Empleado registrado correctamente"
        })
    } return returnError(res);
}

exports.editarEmpleado = async (req, res) => {
    const result = await mEmpleados.editarEmpleado(req.body);
    if(result.affectedRows){
        return res.send({
            type: "success",
            title: "Éxito",
            text: "Empleado actualizado correctamente"
        })
    } return returnError(res);
}

exports.eliminarEmpleado = async (req, res) => {
    const {id} = req.params;
    const usuario = await mEmpleados.revisarUsuario(id);
    if(usuario.length == 0){
        const result = await mEmpleados.eliminarEmpleado(id);
        const nombre = await mEmpleados.getNombre(id);
        if(result.affectedRows){
            await mBorro.nuevoBorrado(req.usuario, `Borro un empleado: ${nombre[0].nombre}`, 'empleados', id);
            return res.send({
                type: "success",
                title: "Éxito",
                text: "Empleado eliminado correctamente"
            })
        } return returnError(res);
    } else {
        return res.send({
            type: "error",
            title: "Error",
            text: "Este empleado esta asociado a un usuario, por lo que no puede ser eliminado"
        })
    }
}