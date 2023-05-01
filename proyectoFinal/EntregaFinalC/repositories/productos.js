import prod from "../models/models/productos.js";
import ProdFactory from "../models/factories/productos.js";
import { transformarDTO } from "../models/DTO/productos.js";

export default class ProductsRepo {
  constructor() {
    this.factory = new ProdFactory();
    this.dao = this.factory.getDao();
  }

  async getAll() {
    const dtos = await this.dao.getAll();
    return dtos.map((dto) => new prod(dto));
  }

  async getById(id) {
    const dto = await this.dao.getById(id);
    return dto ? new prod(dto) : null;
  }

  async save(producto) {
    const dto = transformarDTO(producto);
    const saved = await this.dao.save(dto);
    return new prod(saved);
  }

  /* async deleteAll() {
    await this.dao.deleteAll();
  } */

  async deleteById(id) {
    const removed = await this.dao.deleteById(id);
    return removed;
  }

  async put(id, producto) {
    const updated = await this.dao.update(id, transformarDTO(producto));
    return new prod(updated);
  }
}
