const Contenedor = require("./Funciones/Contenedor.js");
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));

app.set("view engine", "ejs");

//Contenedores
const productosContenedor = new Contenedor("productos.txt");
const mensajesContenedor = new Contenedor("mensajes.txt");

//Get

app.get("/", async (req, res) => {
  try {
    const productos = await productosContenedor.getAll();
    res.render("index", {productos: productos,});
  } catch (error) {
    console.log(error);
  }
});

//Socket

io.on("connection", async (socket) => {
    console.log ("Un usuario se conectó");

    const productos = await productosContenedor.getAll();
    socket.emit('productos', productos);
    socket.on("newProduct", async (data) => {
      await productosContenedor.save(data);       
      io.sockets.emit('productos', await productosContenedor.getAll());
  })


    const mensajes = await mensajesContenedor.getAll();
    socket.emit('messages', mensajes);
    socket.on('newMessage', async (data) => {
      await mensajesContenedor.save(data);
      io.sockets.emit("messages", await mensajesContenedor.getAll());
    })
})

const PORT = 8080

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})