const jtw = require('jsonwebtoken');

const secret = 'mysecretsystem';

exports.auth = (req, res, next) => {
    const token = req.headers['access'];

    if(!token){
        res.status(403).send({
            type: "notok",
            title: "Error",
            text: "Token no provisto. Por favor inicie sesión,"
        })
    } else {
        jtw.verify(token, secret, (err, decoded) => {
            if(err){
                res.status(403).send({
                    type: "notok",
                    title: "Error",
                    text: "Token invalido o expirado. Por favor inicie sesión."
                })
            } else {
                req.userId = decoded.userId;
                req.usuario = decoded.usuario;
                console.log('------------------------');
                console.log('Id: ' + req.userId + ' - Usuario: ' + req.usuario);
                console.log('------------------------');
                next();
            }
        })
    }
}