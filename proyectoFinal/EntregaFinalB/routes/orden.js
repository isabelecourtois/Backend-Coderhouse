import express from "express";
import ordenCnt from "../controllers/orden.js"


const { Router } = express;
const orderR = Router();
const ordenCtrl = new ordenCnt();


orderR.post("/:id_usr", ordenCtrl.postOrden)
 
export default orderR;