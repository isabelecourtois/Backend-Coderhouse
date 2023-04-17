import { cartContainer } from "../routes/carrito.js";
import { prodContainer } from "../routes/productos.js";


export async function getProductsInCart(req, res) {
  const cart = await cartContainer.getById(req.params.id);
  //console.log(cart);
  res.json(cart[0].productos);
}

export async function deleteCart(req, res) {
  const id = await cartContainer.deleteById(req.params.id);
  res.json({ status: "ok", deletedCart: id });
}

export async function deleteProductInCart(req, res) {
  const { id, id_prod } = req.params;
  const cart = await cartContainer.getById(id);
  console.log(cart);

  let i = 0;
  while (i < cart[0].productos.length)  {
    if(cart[0].productos[i]._id == id_prod) {
      cart[0].productos.splice(i, 1)
      break
    }
    i++
  }
  const updatedCartId = await cartContainer.update(id, cart[0]);
  res.json({
      status: "ok",
      updatedCart: updatedCartId,
      productDeletedId: id_prod,
    });
}

export async function postCart(req, res) {
  const newCart = { timestamp: Date.now(), productos: [] };
  const idNew = await cartContainer.save(newCart);
  res.status(201).json({ status: "ok", numCompra: idNew });
}

export async function postProductInCart(req, res) {
  const cartId = req.params.id;
  const productId = req.params.id_prod;
  console.log(cartId);
  console.log(productId);

  const cart = await cartContainer.getById(cartId)[0];
  const product = await prodContainer.getById(productId)[0];
  console.log(cart);
  console.log(product);

  cart.productos.push(product);
  console.log(cart);
  const updatedCartId = await cartContainer.update(cartId, cart);
  res.json({ status: "ok", updatedCart: updatedCartId, productAdded: product });
}
