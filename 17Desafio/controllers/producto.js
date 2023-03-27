import { prodContainer } from "../routes/productos.js";

export async function deleteProducts(req, res) {
  const id = await prodContainer.deleteById(req.params.id);
  console.log(id);
  res.json({ status: "ok", deletedProduct: id });
}

export async function getProducts(req, res) {
  res.json(
      !req.params.id
        ? await prodContainer.getAll()
        : await prodContainer.getById(req.params.id)
    );
}

export async function postProducts(req, res) {
  const { producto, precio, thumbnail } = req.body;
  const newProduct = {
    producto,
    precio,
    thumbnail,
  };
  const idNew = await prodContainer.save(newProduct);
  res.json({ status: "ok", newProductId: idNew });
}

export async function putProducts(req, res) {
    const { producto, precio, thumbnail } = req.body;
    const updatedProduct = {
      producto,
      precio,
      thumbnail,
    };
    //console.log(updatedProduct);
    const id = await prodContainer.update(req.params.id, updatedProduct);
    //console.log(id);
    res.json({ status: "ok", updatedProduct: [prodContainer.getById(id)] });
  }
  