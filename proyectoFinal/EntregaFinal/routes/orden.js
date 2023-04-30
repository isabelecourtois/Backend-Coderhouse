import express from "express";
import ordenCnt from "../controllers/orden.js"
import { isAuthenticated } from "../services/usuario.js";



const { Router } = express;
const orderRouter = Router();
const ordenCtrl = new ordenCnt();


//orderRouter.get("/", ordenCtrl.dataOrder);

//orderRouter.post("/pedido", ordenCtrl.postOrden);
//orderRouter.post(":userId", isAuthenticated, ordenCtrl.postOrden)
orderRouter.post("/:userId", ordenCtrl.postOrden)
 
export default orderRouter;