const mZona = require('../models/mZona');
const mConsumidores = require('../models/mConsumidores');
const mBorro = require('../models/mBorro');

const returnError = res => {
    return res.send({
        type: "error",
        title: "Error",
        text: "Hubo un error al procesar la solicitud"
    })
}
const returnExisto = (res, text) => {
    return res.send({
        type: "success",
        title: "Éxito",
        text
    });
}

exports.getAll = async (req, res) => {
    const {fprovincia} = req.body;
    const result = await mZona.getAll(fprovincia);
    res.send(result);
}

exports.getById = async (req, res) => {
    const result = await mZona.getById(req.params.id);
    res.send(result);
}

const crearFechaHoy = () => {
    const date = new Date();
    let dia = date.getDate();
    if (dia < 10) dia = "0" + dia;
    let mes = date.getMonth() + 1;
    if (mes < 10) mes = "0" + mes;
    let anio = date.getFullYear();
    let fecha = anio + "-" + mes + "-" + dia;
    return fecha;
}

exports.agregarNueva = async (req, res) => {
    const result = await mZona.registrarNuevaZona(req.body);
    const fecha = crearFechaHoy();
    const id_zona = result.insertId;
    const {particulares, empresas, instituciones} = req.body;
    await mConsumidores.cargarConsumidores(fecha, id_zona, particulares, empresas, instituciones);
    if(result.affectedRows){
        return returnExisto(res, 'Zona registrada correctamente');
    } return returnError(res);
}

exports.editarZona = async (req, res) => {
    const result = await mZona.editarZona(req.body);
    const {idconsumidores} = req.body; 
    const consumidores = await mConsumidores.getConsumidores(idconsumidores);
    const cons = consumidores[0];
    const {particulares, empresas, instituciones, id} = req.body;
    if(cons.particulares != particulares 
        || cons.empresas != empresas 
        || cons.instituciones != instituciones){
            await mConsumidores.cambiarActiva(idconsumidores);
            const fecha = crearFechaHoy();
            await mConsumidores.cargarConsumidores(fecha, id, particulares, empresas, instituciones);
        }
    if(result.affectedRows){
        return returnExisto(res, 'Zona de servicio actualizada correctamente');
    } return returnError(res);
}

exports.eliminarZona = async (req, res) => {
    const {id} = req.params;
    const result = await mZona.eliminarZona(id);
    const nombre = await mZona.getById(id);
    await mBorro.nuevoBorrado(req.usuario, 
        `Borro una zona de servicio: ${nombre[0].nombre}`, 'zonas_servicio', id
    );
    if(result.affectedRows){
        return returnExisto(res, 'Zona de servicio eliminada correctamente');
    } return returnError(res);
}

exports.getByProvincia = async (req, res) => {
    const {id} = req.body;
    const result = await mZona.getByProvincia(id);
    res.send(result);
}