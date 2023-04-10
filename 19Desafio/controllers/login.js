import { userMongo } from "./usuarioPassport.js";


export const usuarios = new userMongo

//Registro

export function getRegister (ctx)  {
    ctx.render('register')
}


export function getRegisterError (ctx)  {
    ctx.render('register-error')
}


// Rutas de login 

export function getLogin (ctx)  {
    if (ctx.isAuthenticated()) {
        ctx.response.redirect('/index')
    }
    ctx.render('login')
}


export function getLoginError (ctx)  {
    ctx.response.render('login-error')
}

// Rutas de index 

export function requireAuthentication(ctx) {
    if (ctx.isAuthenticated()) {
        next()
    } else {
        ctx.response.redirect('/login')
    }
}

export function getIndex ( ctx) {
    if (!ctx.user.contador) {
        ctx.user.contador = 0
    }

    ctx.user.contador++

    const usuario = Array.from(usuarios).find(usuario => usuario.username == ctx.user.username)

    ctx.response.render('index', {
        datos: usuario,
        contador: ctx.user.contador
    })
}

// Ruta de logout 

export function getLogout (ctx)  {
    req.logout(err => {
        ctx.response.redirect('/login')
    })
}


// Ruta raiz //


export function getRaiz (ctx)  {
    ctx.response.redirect('/index')
}
