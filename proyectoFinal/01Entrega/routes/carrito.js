const express = require("express");
const Contenedor = require("../containers/Contenedor.js");
const { postCarrito, deleteCarrito, getProductosCarrito, postProductoCarrito, deleteProductoCarrito } = require ("../controllers/carrito.js");

const { Router } = express;
const carritoRouter = Router();

const carritoContainer = new Contenedor("../containers/carito.txt");

carritoRouter.delete("/:id?", deleteCarrito);

carritoRouter.post("/", postCarrito);

carritoRouter.get("/:id/productos", getProductosCarrito);

carritoRouter.post("/:id/productos", postProductoCarrito);

carritoRouter.delete("/:id/productos/:id_prod", deleteProductoCarrito);

module.exports = carritoRouter;
module.exports = carritoContainer;

