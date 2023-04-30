import { userMongo } from "./usuarioPassport.js";


export const usuarios = new userMongo

//Registro

export function getRegister (req, res)  {
    res.render('register')
}


export function getRegisterError (req, res)  {
    res.render('register-error')
}


// Rutas de login 

export function getLogin (req, res)  {
    if (req.isAuthenticated()) {
        res.redirect('/index')
    }
    res.render('login')
}


export function getLoginError (req, res)  {
    res.render('login-error')
}

// Rutas de index 

export function requireAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

export function getIndex ( req, res) {
    if (!req.user.contador) {
        req.user.contador = 0
    }

    req.user.contador++

    const usuario = Array.from(usuarios).find(usuario => usuario.username == req.user.username)

    res.render('index', {
        datos: usuario,
        contador: req.user.contador
    })
}

// Ruta de logout 

export function getLogout (req, res)  {
    req.logout(err => {
        res.redirect('/login')
    })
}


// Ruta raiz //


export function getRaiz (req, res)  {
    res.redirect('/index')
}
