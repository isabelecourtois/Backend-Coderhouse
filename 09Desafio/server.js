import { ContenedorSQL } from "./Containers/ContainerSQL.js";
import { optionsSql } from "./options/mysqlconn.js";
import { optionsSqlite } from "./options/mysqlconn.js";
import Contenedor from "./Containers/Container.js";
import { productosNuevos } from "./Containers/mockProductos.js";

import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));

app.set("view engine", "ejs");

//Contenedores
const productosContenedor = new ContenedorSQL(optionsSqlite, "productos");
const mensajesContenedor = new Contenedor("./Funciones/mensajes.txt");

productosContenedor.crearTablaProductos()
  .then(() => {
    console.log("1- tabla creada productos")

    const nuevo = [
      {
        producto: "GoPro",
        precio: "3500",
        thumbnail: "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-20-512.png",
      },
      {
        producto: "Mapa",
        precio: "250",
        thumbnail: "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-04-2-256.png",
      },
      {
        producto: "Maleta",
        precio: "1850",
        thumbnail: "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-16-256.png",
      },
      {
        producto: "Brújula",
        precio: "500",
        thumbnail: "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-07-256.png",
      }
    ]

    return productosContenedor.save(nuevo)
  })

//Get

app.get("/", async (req, res) => {
  try {
    const productos = await productosContenedor.getAll();
    res.render("index", { productos: productos, });
  } catch (error) {
    console.log(error);
  }
});

//Get Faker

app.get("/api/productos-test", async (req, res) => {
  try {
    const productos = await productosNuevos(5);
    res.render("index", { productos: productos, });
    console.log(productos);
  } catch (error) {
    console.log(error);
  }
 
});


//Socket

io.on("connection", async (socket) => {
  console.log("Un usuario se conectó");

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