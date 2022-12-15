import { prodContainer } from "../routes/productos.js";

export async function deleteProducts(req, res) {
  const id = await prodContainer.deleteById(req.params.id);
  res.json({ status: "ok", deletedProduct: id });
}

export async function getProducts(req, res) {
  console.log(req.params.id);
  res.json(
      !req.params.id
        ? await prodContainer.getAll()
        : await prodContainer.getById(req.params.id)
    );
}

export async function postProducts(req, res) {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const newProduct = {
    timestamp: Date.now(),
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
  };
  const idNew = await prodContainer.save(newProduct);
  res.json({ status: "ok", newProductId: idNew });
}

export async function putProducts(req, res) {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const updatedProduct = {
      timestamp: Date.now(),
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    };
    const id = await prodContainer.update(req.params.id, updatedProduct);
    res.json({ status: "ok", updatedProduct: [prodContainer.getById(id)] });
  }
  