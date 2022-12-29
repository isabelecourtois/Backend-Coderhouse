import { cartContainer } from "../routes/carito.js";
import { prodContainer } from "../routes/productos.js";


export async function getProductsInCart(req, res) {
  const cart = await cartContainer.getById(req.params.id);
  //console.log(cart.productos);
  res.json(cart.productos);
}

export async function deleteCart(req, res) {
  const id = await cartContainer.deleteById(req.params.id);
  res.json({ status: "ok", deletedCart: id });
}

export async function deleteProductInCart(req, res) {
  const { id, id_prod } = req.params;
  const cart = await cartContainer.getById(id);
  console.log(cart);

  const newCartProducts = cart.productos.filter((producto) => {
    return producto.id != id_prod;
  });

  cart.productos = newCartProducts;
  const updatedCartId = await cartContainer.update(id, cart);
  res.json({
      status: "ok",
      updatedCart: updatedCartId,
      productDeletedId: id_prod,
    });
}

export async function postCart(req, res) {
  const newCart = { timestamp: Date.now(), productos: [] };
  const idNew = await cartContainer.save(newCart);
  res.status(201).json({ status: "ok", newCartId: idNew });
}

export async function postProductInCart(req, res) {
  const cartId = req.params.id;
  const productId = req.params.id_prod;
  //console.log(cartId);
  //console.log(productId);

  const cart = await cartContainer.getById(cartId);
  const product = await prodContainer.getById(productId);
  //console.log(cart);
  //console.log(product);

  cart.productos.push(product);
  console.log(cart);
  const updatedCartId = await cartContainer.update(cartId, cart);
  res.json({ status: "ok", updatedCart: updatedCartId, productAdded: product });
}
