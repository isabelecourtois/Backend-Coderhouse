import express from "express";
import Container from "../containers/Container.js";
import ContainerFirebase from "../containers/ContainerFirebase.js";
import ContainerMongo from "../containers/ContainerMongo.js";
import { administrador } from "../controllers/permisoAdmin.js";
import { getProducts, postProducts, putProducts, deleteProducts } from "../controllers/producto.js";

const { Router } = express;
const prodRouter = Router();

//export const prodContainer = new Container("./containers/data/products.txt");

let metodoDB = 0;
export let prodContainer = "container"

switch (metodoDB) {
    
  case 0:
    console.log("FS");
    break;
    prodContainer = new Container("./containers/data/products.txt");
  case 1:
    console.log("FB");
    break;
  prodContainer = new ContainerFirebase("carts", serviceAccount);
   //case 2:
    //text = "No value found";
} 


prodRouter.get("/:id?", getProducts);

prodRouter.post("/", administrador , postProducts);

prodRouter.put("/:id", administrador, putProducts);

prodRouter.delete("/:id", administrador, deleteProducts);

export default prodRouter;
