import mensaje from "../modelos/mensajes.js";
import { transformarADTO } from "../models/DTOs/mensajesDTO.js";
import mensajesFactory from "../factory/mensajes.js";



export default class MensajesRepo {

    constructor() {

        this.factory = mensajesFactory.getInstance();
        this.dao = this.factory.getDao()

    }

    async getAll() {
        const dtos = await this.dao.getAll()
        return dtos.map(dto => new mensaje(dto))
    }

    async getById(id) {
        const dto = await this.dao.getById(id);
        console.log(dto)
        return new mensaje(dto)
    }

    async save(producto) {
        const dto = transformarADTO(producto);
        const saved = await this.dao.save(dto);
        return new mensaje(saved)
    }

    async deleteAll() {
        await this.dao.deleteAll();
    }

    async deleteById(id) {
        const removed = await this.dao.deleteById(id);
        return new mensaje(removed)
    }

    async update(id, mensaje) {
        const updated = await this.dao.update(id, transformarADTO(mensaje))
        return new mensaje(updated)
    }
}