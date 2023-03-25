import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import { transformarADTO } from "../DTO/mensajesDTO.js";

export default class mensajesDAOMongo {
  constructor(model) {
    this.model = model;
  }

  #generateDAOCompatible(mongooseOBJ) {
    if (Array.isArray(mongooseOBJ)) {
      return mongooseOBJ.map((m) => {
        return { id: m._id, mail: m.mail, nombre: m.nombre, apellido: m.apellido, edad: m.edad, alias: m.alias, avatar: m.avatar, message: m.message, dateAndTime: m.dateAndTime };
      });
    } else {
      return {
        id: mongooseOBJ._id,
        mail: mongooseOBJ.mail,
        nombre: mongooseOBJ.nombre,
        apellido: mongooseOBJ.apellido,
        edad: mongooseOBJ.edad,
        alias: mongooseOBJ.alias,
        avatar: mongooseOBJ.avatar,
        message: mongooseOBJ.message,
        dateAndTime: mongooseOBJ.dateAndTime,
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
      const mensajes = await this.model.find();
      return transformarADTO(this.#generateDAOCompatible(mensajes));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
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
