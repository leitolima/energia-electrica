const mLogin = require('../models/mLogin');

const jwt = require('jsonwebtoken');
const secret = 'mysecretsystem';

exports.verificarUsuario = async (req, res) => {
    const {usuario, clave} = req.body;
    const result = await mLogin.findUser(usuario);
    if(result.length === 0){
        //No se encontro el usuario
        return res.send({auth: false});
    } else {
        if(result[0].clave === clave){
            const userId = result[0].id;
            //Token de una hora con el id del usuario
            const token = jwt.sign({userId}, secret, {
                expiresIn: 60 * 60
            });
            return res.send({auth: true, token});
        } else {
            return res.send({auth: false});
        }
    }
}