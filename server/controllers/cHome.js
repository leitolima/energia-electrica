const mUsuarios = require('../models/mUsuarios');
const mCentrales = require('../models/mCentrales');

exports.getData = async (req, res) => {
    // Calculo de porcentajes de usuario
    const users = await mUsuarios.getAll();
    const completo1 = users.length;
    const administrador = users.filter(u => u.nivel == 'Administrador' && u.activo == 1);
    const supervisor = users.filter(u => u.nivel == 'Supervisor' && u.activo == 1);
    const empleado = users.filter(u => u.nivel == 'Empleado' && u.activo == 1);
    const inactivos = users.filter(u => u.activo == 0);
    const porcentajesUsuarios = [
        (administrador.length*100)/completo1,
        (supervisor.length*100)/completo1,
        (empleado.length*100)/completo1,
        (inactivos.length*100)/completo1,
    ];
    // Calculo de porcentajes de compañias
    const centrales = await mCentrales.getAll();
    const completo2 = centrales.length;
    const solar = centrales.filter(c => c.tipo == 'Solar');
    const termica = centrales.filter(c => c.tipo == 'Termica');
    const nuclear = centrales.filter(c => c.tipo == 'Nuclear');
    const hidroelectrica = centrales.filter(c => c.tipo == 'Hidroelectrica');
    const porcentajesCentrales = [
        (solar.length*100)/completo2,
        (termica.length*100)/completo2,
        (nuclear.length*100)/completo2,
        (hidroelectrica.length*100)/completo2,
    ];
    console.log(porcentajesUsuarios);
    console.log(porcentajesCentrales);
    res.send({usuarios: porcentajesUsuarios, centrales: porcentajesCentrales});
}