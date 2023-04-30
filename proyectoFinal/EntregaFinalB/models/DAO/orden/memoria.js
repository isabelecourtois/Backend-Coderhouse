import { transformarDTO } from "../../DTO/carrito.js";

export default class ordenMem {
  constructor() {
    if (!ordenMem.instance) {
      ordenMem.instance = this;
        this.carts = [];
    }
    return ordenMem.instance;
  }

  generateID() {
    return String(Date.now() + Math.floor(Math.random() * 100));
  }

  getIndex(id) {
    return this.carts.findIndex((p) => p.id == id);
  }

  getAll() {
    return transformarDTO(this.carts);
  }

  getById(id) {
    return transformarDTO(this.carts[this.getIndex(id)]);
  }

  save(object) {
    object.id = this.generateID();
    this.carts.push(object);
    return object;
  }

  deleteById(id) {
    const deleted = transformarDTO(
      this.carts.splice(this.getIndex(id), 1)
    );
    return id;
  }

  deleteAll() {
    this.carts = [];
  }

  update(id, producto) {
    const updated = { ...this.carts[this.getIndex(id)], ...producto };
    this.carts.splice(this.getIndex(id), 1, updated);
    return transformarDTO(updated);
  }
}
