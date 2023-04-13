//import express from "express";
import Container from "../mochaTest/mocha/Container.js"
import { getProducts, postProducts, putProducts, deleteProducts } from "../controllers/producto.js";
import Router from "koa-router";

//import { validId, existsProduct } from "../controllers/products/productsValidations.js";

//const { Router } = express;
const prodRouter = Router({prefix: '/productos'});

export const prodContainer = new Container("./mochaTest/mocha/products.txt");

prodRouter.get("/productos/", getProducts);

prodRouter.post("/productos/", postProducts);

prodRouter.put("/productos/:id", putProducts);

prodRouter.delete("/productos/:id", deleteProducts);


export {prodRouter};
