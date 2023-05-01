import orden from "../models/models/orden.js";
import ordenFactory from "../models/factories/orden.js";
import { transformarDTO } from "../models/DTO/orden.js";


export default class ordenRep {
  constructor() {
    this.factory = new ordenFactory()
    this.dao = this.factory.getDao();
  }
 
  async getAll() {
    const dtos = await this.dao.getAll();
    return dtos.map((dto) => new orden(dto));
  }

  async getById(id) {
    const dto = await this.dao.getById(id);
    return dto ? new orden(dto) : null;
  }

  async save(order) {
    const dto = transformarDTO(order);
    const saved = await this.dao.save(dto);
    return new orden(saved);
  }

  async deleteAll() {
    await this.dao.deleteAll();
  }

  async deleteById(id) {
    const removed = await this.dao.deleteById(id);
    return removed;
  }

  async update(id, order) {
    const updated = await this.dao.update(id, transformarDTO(order));
    return new orden(updated);
  }
}
