const router = require('express').Router();
const cUsuarios = require('./controllers/cUsuarios');
const cEmpleados = require('./controllers/cEmpleados');

const auth = require('./middleware').auth;

router.get('/api/checkout', auth, (req, res) => {
    res.sendStatus(200);
})

//Usuarios
router.get('/usuario/get/all', cUsuarios.getAll);
router.post('/usuario/nuevo', cUsuarios.agregarNuevoUsuario);
router.post('/usuario/editar', cUsuarios.editarUsuario);
router.get('/usuario/eliminar/:id', cUsuarios.eliminarUsuario);

//Empleados
router.get('/empleado/get/all', cEmpleados.getAll);
router.get('/empleados/get/sinusuario', cEmpleados.getAllSinUsuario);
router.post('/empleado/nuevo', cEmpleados.agregarNuevoEmpleado);
router.post('/empleado/editar', cEmpleados.editarEmpleado);
router.get('/empleado/eliminar/:id', cEmpleados.eliminarEmpleado);

module.exports = router;