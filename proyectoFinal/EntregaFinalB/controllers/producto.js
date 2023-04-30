import prodSer from "../services/productos.js";
import { loggers } from "../loggers/loggers.js";

const ser = new prodSer();

class prodCnt {

 async deleteProducts(req, res) {
    const { id } = req.params;
    const deletedId = await ser.deleteProduct(id);
    res.json({ deletedId: deletedId });
  }

 async getProducts(req, res) {
  try {
    const products = await ser.getAll();
    res.json(products);
  } catch (error) {
    loggers.error(error);
  }
}

async getProduct(req, res) {
  const { id } = req.params;
  const product = await ser.getById(id);
  res.json(product);
}

 async postProducts(req, res) {
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
  const idNew = await ser.postProduct(newProduct);
  res.json({newProductId: idNew });
}

 async putProducts(req, res) {
  const { id } = req.params;  
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
    res.json(await ser.putProduct(id, updatedProduct));
  }}

  export default prodCnt
  