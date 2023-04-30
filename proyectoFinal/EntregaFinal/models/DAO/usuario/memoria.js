import { transformarDTO } from "../../DTO/usuario.js";
import { loggers } from "../../../loggers/loggers.js";

export default class usuarioMem {
  constructor() {
    if (!usuarioMem.instance) {
      usuarioMem.instance = this;
      this.users = [];
    }
    return usuarioMem.instance;
  }

  generateID() {
    return String(Date.now() + Math.floor(Math.random() * 100));
  }

  getIndex(id) {
    return this.users.findIndex((p) => p.id == id);
  }

  getIndexByEmail(email) {
    return this.users.findIndex((p) => p.email == email);
  }

  getAll() {
    return transformarDTO(this.users);
  }

  getById(id) {
    let find = this.productos[this.getIndex(id)];
    return find
      ? transformarDTO(this.productos[this.getIndex(id)])
      : null;
  }

  getByEmail(email) {
    try {
      let find = this.users[this.getIndexByEmail(email)];
      if (find) {
        return transformarDTO(find);
      } else {
        return null;
      }
    } catch (error) {
      loggers.error(error);
    }
  }

  save(object) {
    object.id = this.generateID();
    this.users.push(object);
    return object;
  }

  deleteById(id) {
    const deleted = transformarDTO(
      this.users.splice(this.getIndex(id), 1)
    );
    return id;
  }

  deleteAll() {
    this.users = [];
  }

  update(id, producto) {
    const updated = { ...this.users[this.getIndex(id)], ...producto };
    this.users.splice(this.getIndex(id), 1, updated);
    return transformarDTO(updated);
  }
}
