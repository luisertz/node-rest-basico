const jwt = require('jsonwebtoken');

//Verificar Token

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token No es valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

};

let verificaAdmin = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    }

    else {
        return res.json({
            ok: false,
            err: {
                message: 'USUARIO NO ES ADMINISTRADOR'
            }
        })
    }
}



module.exports = {
    verificaToken, verificaAdmin
}

