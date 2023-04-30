import express from "express";
import prodCnt from "../controllers/producto.js";
import { administrador } from "../controllers/permisoAdmin.js";


const { Router } = express;
const prodRouter = Router();
const prodCtrls = new prodCnt ()


prodRouter.get("/:id?", prodCtrls.getProduct);

prodRouter.get("/", prodCtrls.getProducts);

prodRouter.post("/", administrador, prodCtrls.postProducts);

prodRouter.put("/:id", administrador, prodCtrls.putProducts);

prodRouter.delete("/:id", administrador, prodCtrls.deleteProducts);

export default prodRouter;
