import { Router } from "express";
import { productosNuevos } from "../persistence/DAOs/mockProductos.js"

const faker =  Router();

faker.get("/productos-test", async (req, res) => {
  try {
    const productos = await productosNuevos(5);
    res.render("index", { productos: productos, });
    console.log(productos);
  } catch (error) {
    console.log(error);
  }

});

export default faker