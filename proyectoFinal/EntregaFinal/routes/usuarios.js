import express from "express";
import usuarioCnt from "../controllers/usuario.js"


const { Router } = express;
const usuarioRouter = Router();
const usuarioCtrl = new usuarioCnt();


usuarioRouter.post("/login", usuarioCtrl.login);

usuarioRouter.post("/register", usuarioCtrl.register);

usuarioRouter.get("/", usuarioCtrl.getUsuario)

export default usuarioRouter;