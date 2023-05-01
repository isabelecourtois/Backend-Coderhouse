import carroSer from "../services/carrito.js";
import * as dotenv from "dotenv";
dotenv.config();

const ser = new carroSer();

export default class carroCnt {
  async postCarro(req, res) {
    const idNew = await ser.postCarro();
    res.status(201).json({ status: "ok", newCartId: idNew });
  }

  async getCarros(req, res) {
    const carts = await ser.getCarros();
    res.status(200).json(carts);
  }

  async deleteCarro(req, res) {
    const id = req.params.id;
    const deletedId = await ser.deleteCarro(id);
    res.status(200).json({ status: "ok", deletedCart: deletedId });
  }

  async deleteProductoCarro(req, res) {
    const cartId = req.params.id;
    const productId = req.params.id_producto;
    const updatedCart = await ser.deleteProductoCarro(cartId, productId);
    res.status(201).json(updatedCart);
  }

  async getProductosCarro(req, res) {
    const id = req.params.id;
    const products = await ser.getProductosCarro(id);
    res.status(200).json(products);
  }

  async postProductoCarro(req, res) {
    const cartId = req.params.id;
    
    const productId = req.params.id_prod;
    
    const updatedCart = await ser.postProductoCarro(cartId, productId);
    //console.log(cartId);
    //console.log(productId);
    return updatedCart? res.json(updatedCart) : res.json({status: "Ups, algo salió mal"})
    
  }
}
