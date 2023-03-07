import express from "express";
import Container from "../containers/Container.js";
import ContainerFirebase from "../containers/ContainerFirebase.js";
import { serviceAccount } from "../containers/ContainerFirebase.js";
import ContainerMongo from "../containers/ContainerMongo.js";
import * as model from "../containers/data/modelsMongo/carrito.js";
import {postCart, deleteCart, getProductsInCart, postProductInCart, deleteProductInCart,} from "../controllers/carrito.js";


const { Router } = express;
const cartRouter = Router();

//export const cartContainer = new Container("./containers/data/carts.txt");

let metodoDB = 0;
let cartContainer = ""

switch (metodoDB) {

    case 0:
        console.log("FS");
        cartContainer = new Container("./containers/data/carts.txt");
        break;
    case 1:
        console.log("FB");
        cartContainer = new ContainerFirebase("carrito", serviceAccount);
        break;
    case 2:
        console.log("MDB");
        cartContainer = new ContainerMongo("mongodb://localhost:27017/ecommerce", model.carrito);
        break;
}

export { cartContainer };


cartRouter.delete("/:id?", deleteCart);

cartRouter.post("/", postCart);

cartRouter.get("/:id/productos", getProductsInCart);

cartRouter.post("/:id/productos/:id_prod", postProductInCart);

cartRouter.delete("/:id/productos/:id_prod", deleteProductInCart);

export default cartRouter;
