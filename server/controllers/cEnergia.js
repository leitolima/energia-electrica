const mEnergia = require('../models/mEnergia');

exports.cargarDatos = async (req, res) => {
    const {tipo_carga} = req.body;
    if(tipo_carga == 1){
        //Producida
        const result = await mEnergia.cargarProducida(req.body);
        if(result.affectedRows){
            return res.send({
                type: "success",
                title: "Éxito",
                text: "Carga registrada correctamente"
            });
        }
        return res.send({
            type: "error",
            title: "Error",
            text: "Hubo un error al procesar la solicitud"
        });
    } else {
        //Consumida
        const result = await mEnergia.cargaConsumida(req.body);
        if(result.affectedRows){
            return res.send({
                type: "success",
                title: "Éxito",
                text: "Carga registrada correctamente"
            });
        }
        return res.send({
            type: "error",
            title: "Error",
            text: "Hubo un error al procesar la solicitud"
        });
    }
}

exports.informeEnergiaConsumida = async (req, res) => {
    const reporte = await mEnergia.getInformeConsumida();
    res.send(reporte);
}