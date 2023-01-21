import { ContenedorSQL } from "./Containers/ContainerSQL.js";
import { optionsSqlite } from "./options/mysqlconn.js";
import Contenedor from "./Containers/Container.js";
import { productosNuevos } from "./Containers/mockProductos.js";

import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from "connect-mongo"

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


app.use(express.static("./public"));
app.set("view engine", "ejs");

//Cookies & Session

app.use(cookieParser('TeGaneAlan!'))
const mongoAdvOptions = {  useNewUrlParser: true, useUnifiedTopology: true}
app.use(session({

  store: MongoStore.create({
    mongoUrl: "mongodb+srv://rocleco:rocleco@coderhouse.w04bgms.mongodb.net/?retryWrites=true&w=majority",
    mongoOptions: mongoAdvOptions,
    ttl: 600
  }),


  secret: "TeGaneAlan!",
  resave: false,
  saveUninitialized: false,
}))

app.get("/logout", (req, res) => {
  const nombre = req.session.nombre;
req.session.destroy( err => {
  if (err){
    res.render({error: "algo hiciste mal", descripcion: err})
  } else {
    res.render('logout', {
      nombre: nombre, 
    }) ;
  }
})
})

//Contenedores
const productosContenedor = new ContenedorSQL(optionsSqlite, "productos");
const mensajesContenedor = new Contenedor("./Containers/mensajes.txt");

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

app.get("/login", async (req, res) => {
  try {
    req.query.nombre ? req.session.nombre = req.query.nombre : null
    if( req.session.nombre){
    const productos = await productosContenedor.getAll();
    res.render("index", { 
      productos: productos,
      nombre: req.session.nombre,
     });
     console.log("usuario logueado");
    }
    else{
      res.render("login");
      console.log("log-in de usuario");
    }
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


  const mensajes = await mensajesContenedor.getAllNormalizr();
  socket.emit('messages', mensajes);
  socket.on('newMessage', async (data) => {
    await mensajesContenedor.save(data);
    io.sockets.emit("messages", await mensajesContenedor.getAllNormalizr());
  })
  //console.log(mensajes);

})

app.get("/compresion", async (req, res) => {
  try {
    const porcentaje = await mensajesContenedor.compresion();
    res.render(porcentaje);
    console.log(porcentaje);
  } catch (error) {
    console.log(error);
  }
});

//Cookies


const PORT = 8080

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})