import express from "express";
import Container from "../containers/Container.js";
import { administrador } from "../controllers/permisoAdmin.js";
import { getProducts, postProducts, putProducts, deleteProducts } from "../controllers/producto.js";

//import { validId, existsProduct } from "../controllers/products/productsValidations.js";

const { Router } = express;
const prodRouter = Router();

export const prodContainer = new Container("./containers/products.txt");

prodRouter.get("/:id?", getProducts);

prodRouter.post("/", administrador , postProducts);

prodRouter.put("/:id", administrador, putProducts);

prodRouter.delete("/:id", administrador, deleteProducts);

export default prodRouter;
