import { productosContenedor } from "./services/productos.js";
import { mensajesContenedor } from "./services/mensajes.js";
import {optionsSessions} from "./controllers/cookiesAndSessions.js"

import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import dotenv from 'dotenv'
import parseArgs from "minimist";

//Rutas
import random from "./routes/random.js";
import faker from "./routes/faker.js"
import info from "./routes/info.js"
import userRouter from "./routes/usuarios.js"
import prodRouter from "./routes/productos.js";
import routerProductosGraphql from "./routes/productosGraphQL.js"

dotenv.config();

export const args = parseArgs(process.argv.slice(2));

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


app.use(express.static("./public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");

//Cookies & Session

app.use(cookieParser(process.env.SECRET))
app.use(session(optionsSessions))

//Iniciamos Passport

app.use(passport.initialize())
app.use(passport.session())

//Rutas

app.use("/api/", random);
app.use("/api/", faker);
app.use(prodRouter);
app.use("/", info);
app.use(userRouter)
app.use("/productosGraphql/", routerProductosGraphql);

//Socket

io.on("connection", async (socket) => {

  const productos = await productosContenedor.getAll();
  socket.emit('productos', productos);
  socket.on("newProduct", async (data) => {
    await productosContenedor.save(data);
    io.sockets.emit('productos', await productosContenedor.getAll());
  })


  const mensajes = await mensajesContenedor.getAllNormalizr();
  socket.emit('messages', mensajes);
  socket.on('newMessage', async (data) => {
    await mensajesContenedor.save(data);
    io.sockets.emit("messages", await mensajesContenedor.getAllNormalizr());
  })


})


const PORT = 8080

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})