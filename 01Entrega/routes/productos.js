import express from"express";
import Contenedor from"../containers/Contenedor.js";
import {administrador} from "../controllers/permisoAdmin.js";
import { getProductos, postProducto, putProducto, deleteProducto }from "../controllers/producto.js";

const { Router } = express;
const prodRouter = Router();

export const prodContainer = new Contenedor("../containers/productos.txt");

prodRouter.get("/:id?", getProductos);

prodRouter.post("/", administrador , postProducto);

prodRouter.put("/:id", administrador, putProducto);

prodRouter.delete("/:id", administrador, deleteProducto);

export default prodRouter;
//module.exports = prodContainer;
