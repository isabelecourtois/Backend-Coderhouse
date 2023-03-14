import express from "express";
import  {dataOrder, sendOrder}  from "../messages/sendOrder.js";



const { Router } = express;
const orderRouter = Router();


orderRouter.get("/", dataOrder);

orderRouter.post("/pedido", sendOrder);
 
export default orderRouter;