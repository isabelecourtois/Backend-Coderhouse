const express = require("express");
const Contenedor = require("../containers/Contenedor.js");
const administrador = require ("../controllers/permisoAdmin.js");
const { getProductos, postProducto, putProducto, deleteProducto } = require ("../controllers/producto.js");

const { Router } = express;
const prodRouter = Router();

const prodContainer = new Contenedor("../containers/productos.txt");

prodRouter.get("/:id?", getProductos);

prodRouter.post("/", administrador , postProducto);

prodRouter.put("/:id", administrador, putProducto);

prodRouter.delete("/:id", administrador, deleteProducto);

module.exports = prodRouter;
module.exports = prodContainer;
