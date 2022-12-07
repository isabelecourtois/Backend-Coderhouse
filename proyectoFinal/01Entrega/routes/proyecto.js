const express = require('express');
const  Router = express;
const prodRouter = require("./productos.js") ;
const carritoRouter = require("./carrito.js");

const routerProyecto = Router();

routerProyecto.use("/productos", prodRouter);
routerProyecto.use("/carrito", carritoRouter);

module.exports = routerProyecto;