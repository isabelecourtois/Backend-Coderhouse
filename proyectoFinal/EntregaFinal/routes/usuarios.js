import express from "express";
//import { userMongo } from "../db/usuarioPassport.js";
//import ContainerMongo from "../containers/ContainerMongo.js";
import usuarioCnt from "../controllers/usuario.js"

const { Router } = express;
const usuarioRouter = Router();
const usuarioCtrl = new usuarioCnt();

//export const userContainer = new ContainerMongo (userMongo);

usuarioRouter.post("/login", usuarioCtrl.login);
usuarioRouter.post("/register", usuarioCtrl.register);
usuarioRouter.get("/", usuarioCtrl.getUsuario)

export default usuarioRouter;