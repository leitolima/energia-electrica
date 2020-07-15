const mEmpleados = require('../models/mEmpleados');

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

    }
}

exports.eliminarEmpleado = async (req, res) => {
    const {id} = req.params;
    const result = await mEmpleados.eliminarEmpleado(id);
    if(result.affectedRows);
}