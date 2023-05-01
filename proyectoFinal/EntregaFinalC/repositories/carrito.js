import carro from "../models/models/carrito.js";
import carroFactory from "../models/factories/carrito.js";
import { transformarDTO } from "../models/DTO/carrito.js";

export default class carroRep {
  constructor() {
    this.factory = new carroFactory()
    this.dao = this.factory.getDao();
  }

  async getAll() {
    const dtos = await this.dao.getAll();
    return dtos.map((dto) => new carro(dto));
  }

  async getById(id) {
    const dto = await this.dao.getById(id);
    return dto ? new carro(dto) : null;
  }

  async save(cart) {
    const dto = transformarDTO (cart);
    const saved = await this.dao.save(dto);
    return new carro(saved);
  }

  async deleteAll() {
    await this.dao.deleteAll();
  }

  async deleteById(id) {
    const removed = await this.dao.deleteById(id);
    return removed;
  }

  async update(id, cart) {
    const updated = await this.dao.update(id, transformarDTO (cart));
    return new carro(updated);
  }
}
