import express from "express";
import carroCnt from "../controllers/carrito.js"
import { isAuthenticated } from "../services/usuario.js";


//No usados
/* import Container from "../containers/Container.js";
import ContainerFirebase from "../containers/ContainerFirebase.js";
import { serviceAccount } from "../containers/ContainerFirebase.js";
import ContainerMongo from "../containers/ContainerMongo.js";
import {carrito} from "../containers/data/modelsMongo/carrito.js";
import {postCart, deleteCart, getProductsInCart, postProductInCart, deleteProductInCart,} from "../controllers/carrito.js"; */

const { Router } = express;
const carroRouter = Router();
const carroCtrl = new carroCnt();

//export const cartContainer = new Container("./containers/data/carts.txt");

/* let metodoDB = 2;
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
        cartContainer = new ContainerMongo(carrito);
        break;
}

export { cartContainer }; */


/* carroRouter.delete("/:id?", isAuthenticated, carroCtrl.deleteCarro);

carroRouter.post("/", isAuthenticated, carroCtrl.postCarro);

carroRouter.get("/:id/productos", isAuthenticated, carroCtrl.getProductosCarro);

carroRouter.post("/:id/productos/:id_prod", isAuthenticated, carroCtrl.postProductoCarro);

carroRouter.delete("/:id/productos/:id_prod", isAuthenticated, carroCtrl.deleteProductoCarro); */

carroRouter.delete("/:id?", carroCtrl.deleteCarro);

carroRouter.post("/", carroCtrl.postCarro);

carroRouter.get("/:id/productos", carroCtrl.getProductosCarro);

carroRouter.post("/:id/productos/:id_prod", carroCtrl.postProductoCarro);

carroRouter.delete("/:id/productos/:id_prod",carroCtrl.deleteProductoCarro);

export default carroRouter;
