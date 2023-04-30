import { transformarDTO } from "../../DTO/productos.js";

export default class ProdMem {
    constructor() {
        if (!ProdMem.instance) {
            ProdMem.instance = this;
            this.productos = []
        }
        return ProdMem.instance;
      }

    generateID() {
        return String(Date.now() + Math.floor(Math.random() * 100));
    }

    getIndex(id) {
        return this.productos.findIndex(p => p.id == id);
    }

    getAll() {
        return transformarDTO(this.productos);
    }

    getById(id) {
        let find = this.productos[this.getIndex(id)];
        return find
        ? transformarDTO(this.productos[this.getIndex(id)])
        : null;
    }

    save(object) {
        object.id = this.generateID();
        this.productos.push(object)
        return object
    }

    deleteById(id) {
        let find = this.productos[this.getIndex(id)];
        return find
        ? transformarDTO(this.productos.splice(this.getIndex(id), 1))
        : null;
    }

    deleteAll() {
        this.productos = [];
    }

    put(id, producto) {
        const updated = {...this.productos[this.getIndex(id)],...producto};
        this.productos.splice(this.getIndex(id), 1, updated)
        return transformarDTO(updated);
    }
}