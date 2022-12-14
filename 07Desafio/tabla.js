const { options } = require('./options/mysqlconn.js')
const knex = require('knex')(options)
const Contenedor = require("./Funciones/Contenedor.js");


const productosContenedor = new Contenedor(optionsSql, "productos");
const mensajesContenedor = new Contenedor(optionsSqlite, "messages");


mensajesContenedor.crearTablaMensajes()
    .then(() => {
        console.log("1- tabla creada")

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
        console.log('2- articulos insertados')
    })
    .catch(err => console.log(err))
    .finally(() => {
        mensajesContenedor.close()
    })

    productosContenedor.crearTablaMensajes()
    .then(() => {
        console.log("1- tabla creada")

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
        console.log('2- articulos insertados')
    })
    .catch(err => console.log(err))
    .finally(() => {
        productosContenedor.close()
    })