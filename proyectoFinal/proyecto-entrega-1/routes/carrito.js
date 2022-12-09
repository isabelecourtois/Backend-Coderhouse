import express from "express";
import Contenedor from "../containers/Contenedor.js";
import { postCarrito, deleteCarrito, getProductosCarrito, postProductoCarrito, deleteProductoCarrito } from  "../controllers/carrito.js";

const { Router } = express;
const carritoRouter = Router();

export const carritoContainer = new Contenedor("../containers/carito.txt");

carritoRouter.delete("/:id?", deleteCarrito);

carritoRouter.post("/", postCarrito);

carritoRouter.get("/:id/productos", getProductosCarrito);

carritoRouter.post("/:id/productos", postProductoCarrito);

carritoRouter.delete("/:id/productos/:id_prod", deleteProductoCarrito);

export default carritoRouter;
//module.exports = carritoContainer;

