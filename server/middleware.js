const jtw = require('jsonwebtoken');

const secret = 'mysecretsystem';

exports.auth = (req, res, next) => {
    const token = req.headers['access'];

    if(!token){
        res.send({
            type: "error",
            title: "Error",
            text: "Not token provided"
        })
    } else {
        jtw.verify(token, secret, (err, decoded) => {
            if(err){
                res.send({
                    type: "error",
                    title: "Error",
                    text: "Token invalid or expired"
                })
            } else {
                req.email = decoded.email;
                next();
            }
        })
    }
}