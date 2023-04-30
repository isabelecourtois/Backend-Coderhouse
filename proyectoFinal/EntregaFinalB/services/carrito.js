import carroRep from "../repositories/carrito.js";
import ProductsRepo from "../repositories/productos.js";

const carroRepo = new carroRep();
const prodRepo = new ProductsRepo();

export default class carroSer {
  async postCarro() {
    const cart = { timestamp: Date.now(), productos: [] };
    const newCart = await carroRepo.save(cart);
    return newCart.id;
  }

  async getCarros() {
    const carts = await carroRepo.getAll();
    return carts;
  }

  async getProductosCarro(id) {
    const cart = await carroRepo.getById(id);
    return cart.productos;
  }

  async postProductoCarro(cartId, productId) {
    const cart = await carroRepo.getById(cartId);
    const product = await prodRepo.getById(productId);
    if (product && cart) {
      cart.productos.push(product);
      const updatedCart = await carroRepo.update(cartId, cart);
      return updatedCart;
    } else {
      return null
    }
  }

  async deleteProductoCarro(cartId, productId) {
    const cart = await carroRepo.getById(cartId);
    let flag = false;

    const newproductos = cart.productos.filter((producto) => {
      if (producto.id == productId && flag == false) {
        flag = true;
        return false;
      }
      return true;
    });
    cart.productos = newproductos;
    const updatedCart = await carroRepo.update(cartId, cart);
    return updatedCart;
  }

  async deleteCarro(id) {
    const removedId = await carroRepo.deleteById(id);
    return removedId;
  }
}
