const router = require('express').Router();
const cLogin = require('./controllers/cLogin');
const cHome = require('./controllers/cHome');
const cBorro = require('./controllers/cBorro');
const cAccesos = require('./controllers/cAccesos');
const cUsuarios = require('./controllers/cUsuarios');
const cEmpleados = require('./controllers/cEmpleados');
const cCentrales = require('./controllers/cCentrales');
const cSolares = require('./controllers/cSolares');
const cTermicas = require('./controllers/cTermicas');
const cNucleares = require('./controllers/cNucleares');
const cHidroelectricas = require('./controllers/cHidroelectricas');
const cTransformadores = require('./controllers/cTransformadores');
const cProvincias = require('./controllers/cProvincias');
const cZona = require('./controllers/cZona');
const cEstaciones = require('./controllers/cEstaciones');
const cCompania = require('./controllers/cCompania');
const cRedes = require('./controllers/cRedes');
const cLineas = require('./controllers/cLineas');

const auth = require('./middleware').auth;

router.get('/api/checktoken', auth, (req, res) => {
    res.sendStatus(200);
})

//Login
router.post('/login', cLogin.verificarUsuario);
router.get('/home', auth, cHome.getData);

//Borrado
router.post('/borro/get/all', auth, cBorro.getAll);
router.get('/borro/get/:id/:tabla', auth, cBorro.verRegistro);
router.get('/borro/eliminar/:id', auth, cBorro.eliminarRegistro);
router.get('/borro/restaurar/:id', auth, cBorro.restaurarRegistro);
//Accesos
router.get('/accesos/get/:id', auth, cAccesos.getAccesosById);
router.get('/accesos/misaccesos', auth, cAccesos.getMisAccesos);
router.post('/accesos/update', auth, cAccesos.actualizacionAccesos);
//Usuarios
router.post('/usuarios/get/all', auth, cUsuarios.getAll);
router.get('/usuario/get/:id', auth, cUsuarios.getById);
router.post('/usuario/nuevo', auth, cUsuarios.agregarNuevoUsuario);
router.post('/usuario/editar', auth, cUsuarios.editarUsuario);
router.get('/usuario/eliminar/:id', auth, cUsuarios.eliminarUsuario);

//Empleados
router.post('/empleados/get/all', auth, cEmpleados.getAll);
router.get('/empleados/get/sinusuario', auth, cEmpleados.getAllSinUsuario);
router.get('/empleado/get/:id', auth, cEmpleados.getById);
router.post('/empleado/nuevo', auth, cEmpleados.agregarNuevoEmpleado);
router.post('/empleado/editar', auth, cEmpleados.editarEmpleado);
router.get('/empleado/eliminar/:id', auth, cEmpleados.eliminarEmpleado);
//Estaciones
router.post('/estaciones/get/all', auth, cEstaciones.getAll);
router.get('/estaciones/get/:id', auth, cEstaciones.getById);
router.post('/estaciones/nueva', auth,cEstaciones.agregarNueva);
router.post('/estaciones/editar', auth, cEstaciones.editarEstacion);
router.get('/estaciones/eliminar/:id', auth, cEstaciones.eliminarEstacion);
//------------------Centrales------------------//
router.get('/centrales/get/all', auth, cCentrales.getAll);
//Solares
router.post('/solares/get/all', auth, cSolares.getAll);
router.get('/solares/get/:id', auth, cSolares.getById);
router.post('/solares/nuevo', auth, cSolares.agregarNueva);
router.post('/solares/editar', auth, cSolares.editarCentral);
router.get('/solares/eliminar/:id', auth, cSolares.eliminarCentral);
//Termicas
router.post('/termicas/get/all', auth, cTermicas.getAll);
router.get('/termicas/get/:id', auth, cTermicas.getById);
router.post('/termicas/nuevo', auth, cTermicas.agregarNueva);
router.post('/termicas/editar', auth, cTermicas.editarCentral);
router.get('/termicas/eliminar/:id', auth, cTermicas.eliminarCentral);
//Nucleares
router.post('/nucleares/get/all', auth, cNucleares.getAll);
router.get('/nucleares/get/:id', auth, cNucleares.getById);
router.post('/nucleares/nuevo', auth, cNucleares.agregarNueva);
router.post('/nucleares/editar', auth, cNucleares.editarCentral);
router.get('/nucleares/eliminar/:id', auth, cNucleares.eliminarCentral);
//Hidroelectricas
router.post('/hidroelectricas/get/all', auth, cHidroelectricas.getAll);
router.get('/hidroelectricas/get/:id', auth, cHidroelectricas.getById);
router.post('/hidroelectricas/nuevo', auth, cHidroelectricas.agregarNueva);
router.post('/hidroelectricas/editar', auth, cHidroelectricas.editarCentral);
router.get('/hidroelectricas/eliminar/:id', auth, cHidroelectricas.eliminarCentral);

//Transformadores
router.post('/transformadores/get/all', auth, cTransformadores.getAll);
router.get('/transformadores/get/:id', auth, cTransformadores.getById);
router.post('/transformadores/nuevo', auth, cTransformadores.agregarNuevo);
router.post('/transformadores/editar', auth, cTransformadores.editarTransformador);
router.get('/transformadores/eliminar/:id', auth, cTransformadores.eliminarTransformador);

//Provincias
router.post('/provincias/get/all', auth, cProvincias.getAll);
router.get('/provincia/get/:id', auth, cProvincias.getById);
router.post('/provincia/nueva', auth, cProvincias.agregarNueva);
router.post('/provincia/editar', auth, cProvincias.editarProvincia);
router.get('/provincia/eliminar/:id', auth, cProvincias.eliminarProvincia);

//Zonas de servicio
router.post('/zona/get/all', auth, cZona.getAll);
router.get('/zona/get/:id', auth, cZona.getById);
router.post('/zona/nueva', auth, cZona.agregarNueva)
router.post('/zona/editar', auth, cZona.editarZona);
router.get('/zona/eliminar/:id', auth, cZona.eliminarZona);

//Companias
router.post('/compania/get/all',auth, cCompania.getAll);
router.get('/compania/get/:id',auth, cCompania.getById);
router.post('/compania/nueva', auth, cCompania.agregarNueva);
router.post('/compania/editar', auth, cCompania.editarCompania);
router.get('/compania/eliminar/:id', auth, cCompania.eliminarCompania);

//Redes
router.post('/redes/get/all',auth, cRedes.getAll);
router.get('/redes/get/:id',auth, cRedes.getById);
router.post('/redes/nueva', auth, cRedes.agregarNueva);
router.post('/redes/editar', auth, cRedes.editarRed);
router.get('/redes/eliminar/:id', auth, cRedes.eliminarRed);

//Lineas
router.post('/lineas/get/all', auth, cLineas.getAll);
router.get('/lineas/get/:id', auth, cLineas.getById);
router.post('/lineas/nueva', auth, cLineas.agregarNueva);
router.post('/lineas/editar', auth, cLineas.editarLinea);
router.get('/lineas/eliminar/:id', auth, cLineas.eliminarLinea);

module.exports = router;