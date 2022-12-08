//import express = require('express');
import  {Router} from "express";
import prodRouter from "./productos.js" ;
import carritoRouter from"./carrito.js";

const routerProyecto = Router();

routerProyecto.use("/productos", prodRouter);
routerProyecto.use("/carrito", carritoRouter);

export default routerProyecto;