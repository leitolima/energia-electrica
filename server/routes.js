const router = require('express').Router();
const cUsuarios = require('./controllers/cUsuarios');

const auth = require('./middleware').auth;

router.get('/api/checkout', auth, (req, res) => {
    res.sendStatus(200);
})

//Usuarios
router.post('/usuario/nuevo', auth, cUsuarios.agregarNuevoUsuario);
router.post('/usuario/editar', cUsuarios.editarUsuario);
router.get('/usuario/eliminar/:id', cUsuarios.eliminarUsuario);

//Empleados

module.exports = router;