import express from "express";
import Container from "../containers/Container.js";
import ContainerFirebase from "../containers/ContainerFirebase.js";
import { serviceAccount } from "../containers/ContainerFirebase.js";
import ContainerMongo from "../containers/ContainerMongo.js";
import * as model from "../containers/data/modelsMongo/producto.js";
import { administrador } from "../controllers/permisoAdmin.js";
import { getProducts, postProducts, putProducts, deleteProducts } from "../controllers/producto.js";

const { Router } = express;
const prodRouter = Router();

//export const prodContainer = new Container("./containers/data/products.txt");

let metodoDB = 2;
let prodContainer = ""

switch (metodoDB) {

    case 0:
        console.log("FS");
        prodContainer = new Container("./containers/data/products.txt");
        break;
    case 1:
        console.log("FB");
        prodContainer = new ContainerFirebase("productos", serviceAccount);
        break;
    case 2:
        console.log("MDB");
        prodContainer = new ContainerMongo(model.productos);
        break;
}

export { prodContainer };


prodRouter.get("/:id?", getProducts);

prodRouter.post("/", administrador, postProducts);

prodRouter.put("/:id", administrador, putProducts);

prodRouter.delete("/:id", administrador, deleteProducts);

export default prodRouter;
