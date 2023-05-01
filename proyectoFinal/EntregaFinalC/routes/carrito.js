import express from "express";
import carroCnt from "../controllers/carrito.js"
import { isAuthenticated } from "../services/usuario.js";

const { Router } = express;
const carroRouter = Router();
const carroCtrl = new carroCnt();

carroRouter.delete("/:id?", carroCtrl.deleteCarro);

carroRouter.post("/", carroCtrl.postCarro);

carroRouter.get("/:id/productos", carroCtrl.getProductosCarro);

carroRouter.post("/:id/productos/:id_prod", carroCtrl.postProductoCarro);

carroRouter.delete("/:id/productos/:id_prod",carroCtrl.deleteProductoCarro);

export default carroRouter;
