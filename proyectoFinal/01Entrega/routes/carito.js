import express from "express";
import Container from "../containers/Container.js";
import {postCart, deleteCart, getProductsInCart, postProductInCart, deleteProductInCart,} from "../controllers/carrito.js";


const { Router } = express;
const cartRouter = Router();

export const cartContainer = new Container("./containers/carts.txt");

cartRouter.delete("/:id?", deleteCart);

cartRouter.post("/", postCart);

cartRouter.get("/:id/productos", getProductsInCart);

cartRouter.post("/:id/productos/:id_prod", postProductInCart);

cartRouter.delete("/:id/productos/:id_prod", deleteProductInCart);

export default cartRouter;
