import  prodContainer  from "../routes/productos.js";

export async function deleteProducts(req, res) {
    console.log('deleteproducts');
  const id = await prodContainer.deleteById(req.params.id);
  res.status(200).json({ status: "ok", deletedProduct: id });
}

export async function getProducts(req, res) {
    console.log(req.params.id);
  res
    .status(200)
    .json(
      !req.params.id
        ? await prodContainer.getAll()
        : await prodContainer.getById(req.params.id)
    );
}

export async function postProducts(req, res) {
  const { producto, precio, thumbnail } = req.body;
  const newProduct = {
    timestamp: Date.now(),
    producto, 
    precio, 
    thumbnail
  };
  const idNew = await prodContainer.save(newProduct);
  res.status(201).json({ status: "ok", newProductId: idNew });
}

export async function putProducts(req, res) {
    const { producto, precio, thumbnail } = req.body;
    const updatedProduct = {
      timestamp: Date.now(),
      producto, 
      precio, 
      thumbnail
    };
    const id = await prodContainer.update(req.params.id, updatedProduct);
    res
      .status(200)
      .json({ status: "ok", updatedProduct: [prodContainer.getById(id)] });
  }
  