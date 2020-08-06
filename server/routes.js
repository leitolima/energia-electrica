const router = require('express').Router();
const cLogin = require('./controllers/cLogin');
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

//Accesos
router.get('/accesos/get/:id', cAccesos.getAccesosById);
router.post('/accesos/update', cAccesos.actualizacionAccesos);
//Usuarios
router.get('/usuarios/get/all', cUsuarios.getAll);
router.get('/usuario/get/:id', cUsuarios.getById);
router.post('/usuario/nuevo', cUsuarios.agregarNuevoUsuario);
router.post('/usuario/editar', cUsuarios.editarUsuario);
router.get('/usuario/eliminar/:id', cUsuarios.eliminarUsuario);

//Empleados
router.get('/empleados/get/all', cEmpleados.getAll);
router.get('/empleados/get/sinusuario', cEmpleados.getAllSinUsuario);
router.get('/empleado/get/:id', cEmpleados.getById);
router.post('/empleado/nuevo', cEmpleados.agregarNuevoEmpleado);
router.post('/empleado/editar', cEmpleados.editarEmpleado);
router.get('/empleado/eliminar/:id', cEmpleados.eliminarEmpleado);

//------------------Centrales------------------//
//Solares
router.get('/solares/get/all', cSolares.getAll);
router.get('/solares/get/:id', cSolares.getById);
router.post('/solares/nuevo', cSolares.agregarNueva);
router.post('/solares/editar', cSolares.editarCentral);
router.get('/solares/eliminar/:id', cSolares.eliminarCentral);
//Termicas
router.get('/termicas/get/all', cTermicas.getAll);
router.get('/termicas/get/:id', cTermicas.getById);
router.post('/termicas/nuevo', cTermicas.agregarNueva);
router.post('/termicas/editar', cTermicas.editarCentral);
router.get('/termicas/eliminar/:id', cTermicas.eliminarCentral);
//Nucleares
router.get('/nucleares/get/all', cNucleares.getAll);
router.get('/nucleares/get/:id', cNucleares.getById);
router.post('/nucleares/nuevo', cNucleares.agregarNueva);
router.post('/nucleares/editar', cNucleares.editarCentral);
router.get('/nucleares/eliminar/:id', cNucleares.eliminarCentral);
//Hidroelectricas
router.get('/hidroelectricas/get/all', cHidroelectricas.getAll);
router.get('/hidroelectricas/get/:id', cHidroelectricas.getById);
router.post('/hidroelectricas/nuevo', cHidroelectricas.agregarNueva);
router.post('/hidroelectricas/editar', cHidroelectricas.editarCentral);
router.get('/hidroelectricas/eliminar/:id', cHidroelectricas.eliminarCentral);

//Provincias
router.get('/provincias/get/all', cProvincias.getAll);
router.get('/provincia/get/:id', cProvincias.getById);
router.post('/provincia/nueva', cProvincias.agregarNueva);
router.post('/provincia/editar', cProvincias.editarProvincia);
router.get('/provincia/eliminar/:id', cProvincias.eliminarProvincia);

//Zonas de servicio
router.get('/zona/get/all', cZona.getAll);
router.get('/zona/get/:id', cZona.getById);
router.post('/zona/nueva', cZona.agregarNueva)
router.post('/zona/editar', cZona.editarZona);
router.get('/zona/eliminar/:id', cZona.eliminarZona);

module.exports = router;