import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import { transformarADTO } from "../DTOs/productos.js";

export default class productosMongo {
  constructor(model) {
    this.model = model;
  }

  #generateDAOCompatible(mongooseOBJ) {
    if (Array.isArray(mongooseOBJ)) {
      return mongooseOBJ.map((m) => {
        return { id: m._id, nombre: m.nombre, foto: m.foto, precio: m.precio };
      });
    } else {
      return {
        id: mongooseOBJ._id,
        nombre: mongooseOBJ.nombre,
        foto: mongooseOBJ.foto,
        precio: mongooseOBJ.precio,
      };
    }
  }

  async save(object) {
    // WHEN ERROR, UNDEFINED IS RETURNED
    try {
      const saveModel = new this.model(object);
      const saved = await saveModel.save();
      return transformarADTO(this.#generateDAOCompatible(saved));
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    // WHEN NO ROW IS FOUND RETURNS EMPTY ARRAY
    try {
      return transformarADTO(this.#generateDAOCompatible(await this.model.findOne({ _id: id })));
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, newObject) {
    try {     
      return await this.model.updateOne({ _id: id }, newObject);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    // RETURNS ALL ROWS IN ARRAY, EMPTY WHEN EMPTY COLLECTION
    try {
      const productos = await this.model.find({});
      return transformarADTO(this.#generateDAOCompatible(productos));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    // RETURNS LIKE THIS OBJ { acknowledged: true, deletedCount: 1 }
    try {
      return await this.model.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    // RETURNS LIKE THIS OBJ { acknowledged: true, deletedCount: 1 }
    try {
      return await this.model.deleteMany({});
    } catch (error) {
      console.log(error);
    }
  }
}
