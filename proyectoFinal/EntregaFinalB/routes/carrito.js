import express from "express";
import carroCnt from "../controllers/carrito.js"
import { isAuthenticated } from "../services/usuario.js";

const { Router } = express;
const cartR = Router();
const carroCtrl = new carroCnt();

cartR.delete("/:id?", carroCtrl.deleteCarro);

cartR.post("/", carroCtrl.postCarro);

cartR.get("/:id/productos", carroCtrl.getProductosCarro);

cartR.post("/:id/productos/:id_prod", carroCtrl.postProductoCarro);

cartR.delete("/:id/productos/:id_prod",carroCtrl.deleteProductoCarro);

export default cartR;
