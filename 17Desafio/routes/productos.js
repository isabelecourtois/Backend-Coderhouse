import express from "express";
import Container from "../mochaTest/mocha/Container.js"
import { getProducts, postProducts, putProducts, deleteProducts } from "../controllers/producto.js";

//import { validId, existsProduct } from "../controllers/products/productsValidations.js";

const { Router } = express;
const prodRouter = Router();

export const prodContainer = new Container("./mochaTest/mocha/products.txt");

prodRouter.get("/productos", getProducts);

prodRouter.post("/productos", postProducts);

prodRouter.put("/productos/:id", putProducts);

prodRouter.delete("/productos/:id", deleteProducts);

export default prodRouter;
