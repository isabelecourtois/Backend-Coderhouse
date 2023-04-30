import express from "express";
import prodCnt from "../controllers/producto.js";
import { administrador } from "../controllers/permisoAdmin.js";


//No usados
/* import Container from "../containers/Container.js";
import ContainerFirebase from "../containers/ContainerFirebase.js";
import { serviceAccount } from "../containers/ContainerFirebase.js";
import ContainerMongo from "../containers/ContainerMongo.js";
import * as model from "../containers/data/modelsMongo/producto.js";
import { getProducts, postProducts, putProducts, deleteProducts } from "../controllers/producto.js"; */

const { Router } = express;
const prodRouter = Router();
const prodCtrls = new prodCnt ()

//export const prodContainer = new Container("./containers/data/products.txt");

/* let metodoDB = 2;
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

export { prodContainer }; */


prodRouter.get("/:id?", prodCtrls.getProduct);

prodRouter.get("/", prodCtrls.getProducts);

prodRouter.post("/", administrador, prodCtrls.postProducts);

prodRouter.put("/:id", administrador, prodCtrls.putProducts);

prodRouter.delete("/:id", administrador, prodCtrls.deleteProducts);

export default prodRouter;
