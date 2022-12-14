const Contenedor = require("./Funciones/Contenedor.js");
const optionsSql = require("./options/mysqlconn.js");
const optionsSqlite = require("./options/mysqlconn.js");
const { options } = require('./options/mysqlconn.js')
//const knex = require('knex')(options)


const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));

app.set("view engine", "ejs");

//Contenedores
const productosContenedor = new Contenedor(optionsSql, "productos");
const mensajesContenedor = new Contenedor(optionsSqlite, "mensajes");


mensajesContenedor.crearTablaMensajes()
    .then(() => {
        console.log("1- tabla creada mensajes")

        const nuevo = [
            {
                email: "rodleco@gmail.com",
                dateAndTime: "30/11/2022, 21:23:19",
                message: "Hola",
              },
        ]

        return mensajesContenedor.save(nuevo)
    })
    .then(() => {
        console.log('2- mensaje insertado')
    })
    .catch(err => console.log(err))
    .finally(() => {
        mensajesContenedor.close()
    })

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
    .then(() => {
        console.log('2- producto insertado')
    })
    .catch(err => console.log(err))
    .finally(() => {
        productosContenedor.close()
    })

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