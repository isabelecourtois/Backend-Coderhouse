import express from "express";
import { Server as HttpServer } from "http";
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from "connect-mongo"
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'
import cluster from "cluster";
import parseArgs from "minimist";

import prodRouter from "./routes/productos.js";
import carroRouter from "./routes/carrito.js";
import orderRouter from "./routes/orden.js";
import usuarioRouter from "./routes/usuarios.js"
//import { cartContainer } from "./routes/carrito.js";
//import { userMongo } from "./db/usuarioPassport.js";
//import {registerEmail} from "./messages/sendEmail.js"
import { loggers } from "./loggers/loggers.js";

dotenv.config();

//Permiso de administrador para agregar productos
export const admin = true;

const app = express();
const httpServer = new HttpServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set("view engine", "ejs");

app.use("/api/productos", prodRouter);
app.use("/api/carrito", carroRouter);
app.use("/api/pedido", orderRouter);
app.use("/api/usuario", usuarioRouter);

const args = parseArgs(process.argv.slice(2));
loggers.info(args);

const serverM = args.serverMode || "Fork";
export const PORT = args.port ||process.env.PORT || 8080;

if (serverM === "Cluster" && cluster.isPrimary) {
  loggers.info(`Servidor express en ${PORT} - <b> PID: ${process.pid}</b> - ${new Date().toLocaleString()}`);

  for (let index = 0; index < 7; index++) {
    cluster.fork();

    cluster.on("exit", (worker, code, signal) => {
      loggers.info(`Worker ${worker.process.pid} died: ${new Date().toString()}`)
    });
  }
} else {

httpServer.listen(PORT, () => {
  loggers.info(`Servidor escuchando en el puerto ${PORT}`)
})}