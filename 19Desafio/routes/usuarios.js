//import express from "express";
import passport from 'passport'
//import { userMongo } from "../controllers/usuarioPassport.js";
import { registerStrategy, loginStrategy } from "../controllers/usuarios.js";
import { getRegister, getRegisterError, getLogin, getLoginError, requireAuthentication, getIndex, getLogout, getRaiz } from "../controllers/login.js";
import Router from "koa-router";

//const { Router } = express;

//export const usuarios = new userMongo

// Setear registro y log-in PASSPORT

passport.use('register', registerStrategy)
passport.use('login', loginStrategy)


// Rutas de registro 

const userRouter = Router();

userRouter.get('/register', getRegister)
userRouter.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/' }))
userRouter.get('/failregister', getRegisterError)


// Rutas de login 

userRouter.get('/login', getLogin)
userRouter.post('/login', passport.authenticate('login', { failureRedirect: '/login-error', successRedirect: '/index' }))
userRouter.get('/login-error', getLoginError)

// Rutas de index 

userRouter.get('/index', requireAuthentication, getIndex)

// Ruta de logout 

userRouter.get('/logout', getLogout)


// Ruta raiz //


userRouter.get('/', getRaiz)

export default userRouter