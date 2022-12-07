const carritoContainer = require("../routes/carrito.js");
const prodContainer = require("../routes/productos.js");

 async function deleteCarrito (req, res) {
  const id = await carritoContainer.deleteById(req.params.id);
  res.json({ carritoBorrado: id });
}

async function deleteProductoCarrito (req, res) {
  const { id, id_prod } = req.params;
  const cart = carritoContainer.getById(id);
  const newCartProducts = cart.productos.filter((producto) => {
    return producto.id != id_prod;
  });
  cart.productos = newCartProducts;
  const updatedCartId = await carritoContainer.update(id, cart);
  res.json({updatedCart: updatedCartId});
}

async function getProductosCarrito(req, res) {
  const cart = carritoContainer.getById(req.params.id);
  res.json(cart.productos);
}

async function postCarrito(req, res) {
  const newCart = { timestamp: Date.now(), productos: [] };
  const idNew = await carritoContainer.save(newCart);
  res.json({IdCarrito: idNew });
}

async function postProductoCarrito(req, res) {
  const cartId = req.params.id;
  const productId = req.body.id;

  const cart = carritoContainer.getById(cartId);
  const product = prodContainer.getById(productId);

  cart.productos.push(product);
  console.log(cart);
  const updatedCartId = await carritoContainer.update(cartId, cart);
  res.json({ updatedCart: updatedCartId });
}

module.exports = {
    postCarrito,
    deleteCarrito,
    getProductosCarrito,
    postProductoCarrito,
    deleteProductoCarrito
}