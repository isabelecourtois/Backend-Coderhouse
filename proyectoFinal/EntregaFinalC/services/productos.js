import ProductsRepo from "../repositories/productos.js";

const prodRepo = new ProductsRepo();

class prodSer {
  async getAll() {
    const products = await prodRepo.getAll();
    return products
  }

  async getById(id){
    const product = await prodRepo.getById(id);
    return product ? product : {}
  }

  async postProduct(newProduct) {
    const product = await prodRepo.save(newProduct);
    return product.id;
  }

  async deleteProduct(id) {
    const deletedId = await prodRepo.deleteById(id);
    return deletedId;
  }

  async putProduct(id, data) {
    try {
      const oldProduct = await prodRepo.getById(id);
      const updatedProduct = { ...oldProduct, ...data };
      const updated = await prodRepo.put(id, updatedProduct);
      return updated;
    } catch (error) {}
  }
}
export default prodSer