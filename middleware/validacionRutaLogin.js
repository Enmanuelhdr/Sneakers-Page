const User = require("../models/auth/User")

const rutaLoginValidacion = async (req, res, next) => {
    // Verificar si hay un token
    const { token } = req.cookies
    console.log(token);
    if (!token || token == '') {
        res.locals.logueado = false;
        return res.redirect('/Login')
    }
    
    // comprobar el token
    const usuario = await User.findByPk(token.id)
    
    if(!usuario) {
        res.locals.logueado = false;
        return res.redirect('/Login')
    }

    res.locals.logueado = true;

    next();
}

module.exports = rutaLoginValidacion;