const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        // leer el usuario que corresponde al uid
        const userAutenticado = await Usuario.findById(uid);

        if ( !userAutenticado ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            })
        }

        // Verificar si el uid tiene estado true
        if ( !userAutenticado.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con Estado false'
            });
        }

        req.usuarioAuth = userAutenticado;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
}