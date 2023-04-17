import express from "express";
import { mongoContainer } from "../models/mongoContainer.js";
import { users } from "../models/schemas/users.js";
import passport from "passport";
import { loginStrategy, registerStrategy } from "../controllers/users/usersHandlers.js";
import { postUser } from "../controllers/users/usersHandlers.js";
import {getLogin, postLogin, getLoginError, getRegister, getRegisterError, getLogout,} from "../controllers/users/user.js"

passport.use("login", loginStrategy);
passport.use("register", registerStrategy);

const { Router } = express;
const userRouter = Router();

export const userContainer = new mongoContainer(users);

//Login
userRouter.get('/login', getLogin);
userRouter.post("/login", passport.authenticate("login", { failureRedirect: "/loginError" }), postLogin, postUser);
userRouter.get("/loginError", getLoginError);

//Register
userRouter.get("/register", getRegister);
userRouter.post("/register", passport.authenticate("register", { failureRedirect: "/registerError", successRedirect: "/login" }), postUser)
userRouter.get("/registerError", getRegisterError);

// Rutas de index 

/* function requireAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

userRouter.get('/index', requireAuthentication, (req, res) => {
    if (!req.user.contador) {
        req.user.contador = 0
    } req.user.contador++

    const usuario = Array.from(usuarios).find(usuario => usuario.username == req.user.username)
    res.render('index', {
        datos: usuario,
        contador: req.user.contador
    })
}) */

userRouter.get("/logout", getLogout);







//userRouter.delete("/:id?", validId, existsCart, deleteCart);

//userRouter.get("/:id/productos", validId, existsCart, getProductsInCart);

//userRouter.post("/:id/productos/:id_prod", validId, existsCart, existsProductForCartPost, postProductInCart);

//userRouter.delete("/:id/productos/:id_prod", validId, existsCart, existsProductInCart, deleteProductInCart);

export default userRouter;