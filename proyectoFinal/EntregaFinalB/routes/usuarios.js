import express from "express";
import usuarioCnt from "../controllers/usuario.js"


const { Router } = express;
const userR = Router();
const usuarioCtrl = new usuarioCnt();


userR.post("/login", usuarioCtrl.login);

userR.post("/register", usuarioCtrl.register);

userR.get("/", usuarioCtrl.getUsuario)

export default userR;