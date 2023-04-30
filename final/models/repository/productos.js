import producto from "../modelos/productos.js";
import { transformarADTO } from "../DTOs/productos.js";
import productosFactory from "../factory/productos.js";



export default class ProductosRepo {

    constructor() {

        this.factory = productosFactory.getNPC();
        this.dao = this.factory.getDao()
    }

    async getAll() {
        const productosdto = await this.dao.getAll()
        return productosdto.map(p => new producto(p))
    }

    async getById(id) {
        const productosdto = await this.dao.getById(id);
        return new producto(productosdto)
    }

    async save(nuevo) {
        const productosdto = transformarADTO(nuevo);
        const productotrans = await this.dao.save(productosdto);
        return new producto(productotrans)
    }

    async deleteAll() {
        await this.dao.deleteAll();
    }

    async deleteById(id) {
        const removida = await this.dao.deleteById(id);
        return new producto(removida)
    }

    async update(id, producto) {
        const productoupdated = await this.dao.update(id, transformarADTO(producto))
        return new producto(productoupdated)
    }
}