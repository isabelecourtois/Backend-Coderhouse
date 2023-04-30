import express from "express";
import prodCnt from "../controllers/producto.js";


const { Router } = express;
const productsR = Router();
const prodCtrls = new prodCnt ()


productsR.get("/:id?", prodCtrls.getProduct);

productsR.get("/", prodCtrls.getProducts);

productsR.post("/", prodCtrls.postProducts);

productsR.put("/:id", prodCtrls.putProducts);

productsR.delete("/:id", prodCtrls.deleteProducts);

export default productsR;
