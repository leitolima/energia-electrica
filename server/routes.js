const router = require('express').Router();
const cUsuarios = require('./controllers/cUsuarios');

//Usuarios
router.post('/usuario/nuevo', cUsuarios.agregarNuevoUsuario);
router.post('/usuario/editar', cUsuarios.editarUsuario);
router.get('/usuario/eliminar/:id', cUsuarios.eliminarUsuario);

//Empleados

module.exports = router;