import { prodContainer } from "../routes/productos.js";

export async function deleteProducts(ctx) {
  const id = await prodContainer.deleteById(ctx.params.id);
  console.log(id);
  ctx.body({ status: "ok", deletedProduct: id });
}

export async function getProducts(ctx) {
  ctx.body(
      !ctx.params.id
        ? await prodContainer.getAll()
        : await prodContainer.getById(ctx.params.id)
    );
}

export async function postProducts(ctx) {
  const { producto, thumbnail, precio } = ctx.request.body;
  const newProduct = {
    producto,
    thumbnail,
    precio,
    
  };
  const idNew = await prodContainer.save(newProduct);
  ctx.body({ newProductId: idNew });
}

export async function putProducts(ctx) {
    const { producto, precio, thumbnail } = ctx.request.body;
    const updatedProduct = {
      producto,
      precio,
      thumbnail,
    };
    const id = await prodContainer.update(ctx.params.id, updatedProduct);
    ctx.body({ status: "ok", updatedProduct: [prodContainer.getById(id)] });
  }
  