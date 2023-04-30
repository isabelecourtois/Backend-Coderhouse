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
        return { id: m._id, producto: m.producto, precio : m.precio , thumbnail: m.thumbnail };
      });
    } else {
      return {
        id: mongooseOBJ._id,
        producto: mongooseOBJ.producto,
        precio : mongooseOBJ.precio ,
        thumbnail: mongooseOBJ.thumbnail,
      };
    }
  }

  async save(object) {
    try {
      const saveModel = new this.model(object);
      const saved = await saveModel.save();
      return transformarADTO(this.#generateDAOCompatible(saved));
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {

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

    try {
      const productos = await this.model.find({});
      console.log(productos);
      return transformarADTO(this.#generateDAOCompatible(productos));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {

    try {
      console.log(id);
      return await this.model.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {

    try {
      return await this.model.deleteMany({});
    } catch (error) {
      console.log(error);
    }
  }
}
