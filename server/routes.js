const router = require('express').Router();
const cLogin = require('./controllers/cLogin');
const cBorro = require('./controllers/cBorro');
const cAccesos = require('./controllers/cAccesos');
const cUsuarios = require('./controllers/cUsuarios');
const cEmpleados = require('./controllers/cEmpleados');
const cSolares = require('./controllers/cSolares');
const cTermicas = require('./controllers/cTermicas');
const cNucleares = require('./controllers/cNucleares');
const cHidroelectricas = require('./controllers/cHidroelectricas');
const cProvincias = require('./controllers/cProvincias');
const cZona = require('./controllers/cZona');

const auth = require('./middleware').auth;

router.get('/api/checktoken', auth, (req, res) => {
    res.sendStatus(200);
})

//Login
router.post('/login', cLogin.verificarUsuario);

//Borrado
router.get('/borro/get/all', auth, cBorro.getAll);
router.get('/borro/get/:id/:tabla', auth, cBorro.verRegistro);
router.get('/borro/eliminar/:id/', auth, cBorro.eliminarRegistro);
router.get('/borro/restaurar/:id/:id_tabla/:tabla', auth, cBorro.restaurarRegistro);
//Accesos
router.get('/accesos/get/:id', auth, cAccesos.getAccesosById);
router.post('/accesos/update', auth, cAccesos.actualizacionAccesos);
//Usuarios
router.get('/usuarios/get/all', auth, cUsuarios.getAll);
router.get('/usuario/get/:id', auth, cUsuarios.getById);
router.post('/usuario/nuevo', auth, cUsuarios.agregarNuevoUsuario);
router.post('/usuario/editar', auth, cUsuarios.editarUsuario);
router.get('/usuario/eliminar/:id', auth, cUsuarios.eliminarUsuario);

//Empleados
router.get('/empleados/get/all', auth, cEmpleados.getAll);
router.get('/empleados/get/sinusuario', auth, cEmpleados.getAllSinUsuario);
router.get('/empleado/get/:id', auth, cEmpleados.getById);
router.post('/empleado/nuevo', auth, cEmpleados.agregarNuevoEmpleado);
router.post('/empleado/editar', auth, cEmpleados.editarEmpleado);
router.get('/empleado/eliminar/:id', auth, cEmpleados.eliminarEmpleado);

//------------------Centrales------------------//
//Solares
router.get('/solares/get/all', auth, cSolares.getAll);
router.get('/solares/get/:id', auth, cSolares.getById);
router.post('/solares/nuevo', auth, cSolares.agregarNueva);
router.post('/solares/editar', auth, cSolares.editarCentral);
router.get('/solares/eliminar/:id', auth, cSolares.eliminarCentral);
//Termicas
router.get('/termicas/get/all', auth, cTermicas.getAll);
router.get('/termicas/get/:id', auth, cTermicas.getById);
router.post('/termicas/nuevo', auth, cTermicas.agregarNueva);
router.post('/termicas/editar', auth, cTermicas.editarCentral);
router.get('/termicas/eliminar/:id', auth, cTermicas.eliminarCentral);
//Nucleares
router.get('/nucleares/get/all', auth, cNucleares.getAll);
router.get('/nucleares/get/:id', auth, cNucleares.getById);
router.post('/nucleares/nuevo', auth, cNucleares.agregarNueva);
router.post('/nucleares/editar', auth, cNucleares.editarCentral);
router.get('/nucleares/eliminar/:id', auth, cNucleares.eliminarCentral);
//Hidroelectricas
router.get('/hidroelectricas/get/all', auth, cHidroelectricas.getAll);
router.get('/hidroelectricas/get/:id', auth, cHidroelectricas.getById);
router.post('/hidroelectricas/nuevo', auth, cHidroelectricas.agregarNueva);
router.post('/hidroelectricas/editar', auth, cHidroelectricas.editarCentral);
router.get('/hidroelectricas/eliminar/:id', auth, cHidroelectricas.eliminarCentral);

//Provincias
router.get('/provincias/get/all', auth, cProvincias.getAll);
router.get('/provincia/get/:id', auth, cProvincias.getById);
router.post('/provincia/nueva', auth, cProvincias.agregarNueva);
router.post('/provincia/editar', auth, cProvincias.editarProvincia);
router.get('/provincia/eliminar/:id', auth, cProvincias.eliminarProvincia);

//Zonas de servicio
router.get('/zona/get/all', auth, cZona.getAll);
router.get('/zona/get/:id', auth, cZona.getById);
router.post('/zona/nueva', auth, cZona.agregarNueva)
router.post('/zona/editar', auth, cZona.editarZona);
router.get('/zona/eliminar/:id', auth, cZona.eliminarZona);

module.exports = router;