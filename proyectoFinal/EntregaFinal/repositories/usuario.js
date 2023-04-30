import usuario from "../models/models/usuario.js"
import usuarioFactory from "../models/factories/usuario.js";
import { transformarDTO } from "../models/DTO/usuario.js";

export default class usuarioRepo {
    constructor() {
        this.factory = new usuarioFactory();
        this.dao = this.factory.getDao()
    }

    async getAll() {
        const dtos = await this.dao.getAll()
        return dtos.map(dto => new usuario(dto))
    }

    async getById(id) {
        const dto = await this.dao.getById(id);
        return new usuario(dto)
    }

    async getByEmail(email) {
        const dto = await this.dao.getByEmail(email);
        if (dto) {
            return new usuario(dto)
        } else {
            return null
        }
        
    }

    async save(user) {
        const dto = transformarDTO(user);
        const saved = await this.dao.save(dto);
        return new usuario(saved)
    }

    async deleteAll() {
        await this.dao.deleteAll();
    }

    async deleteById(id) {
        const removed = await this.dao.deleteById(id);
        return removed
    }

    async update(id, user) {
        const updated = await this.dao.update(id, transformarDTO(user))
        return new usuario(updated)
    }
}