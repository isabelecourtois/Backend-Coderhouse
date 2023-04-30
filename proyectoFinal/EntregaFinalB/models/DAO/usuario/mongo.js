import mongoose from "mongoose";
import { loggers } from "../../../loggers/loggers.js";
mongoose.set("strictQuery", false);
import { transformarDTO } from "../../DTO/usuario.js";

export default class usuarioMongo {
  constructor(model) {
    this.model = model;
  }

  replaceIDfor_ID(obj) {
    obj["_id"] = obj["id"];
    delete obj["id"];
    return obj;
  }

  generateDAOCompatible(mongooseOBJ) {
    if (Array.isArray(mongooseOBJ)) {
      return mongooseOBJ.map((m) => {
        return {
          id: m._id,
          timestamp: m.timestamp,
          email: m.email,
          nombre: m.nombre,
          direccion: m.direccion,
          edad: m.edad,
          telefono: m.telefono,
          foto: m.foto,
          carritoId: m.carritoId,
          hash: m.hash,
          salt: m.salt,
        };
      });
    } else {
      return {
        id: mongooseOBJ._id,
        timestamp: mongooseOBJ.timestamp,
        email: mongooseOBJ.email,
        nombre: mongooseOBJ.nombre,
        direccion: mongooseOBJ.direccion,
        edad: mongooseOBJ.edad,
        telefono: mongooseOBJ.telefono,
        foto: mongooseOBJ.foto,
        carritoId: mongooseOBJ.carritoId,
        hash: mongooseOBJ.hash,
        salt: mongooseOBJ.salt,
      };
    }
  }

  async save(object) {

    try {
      const saveModel = new this.model(object);
      const saved = await saveModel.save();
      return transformarDTO(this.generateDAOCompatible(saved));
    } catch (error) {
      loggers.error(error);
    }
  }

  async getById(id) {

    try {
      let find = await this.model.findOne({ _id: id });
      return find
        ? transformarDTO(
            this.generateDAOCompatible(await this.model.findOne(find))
          )
        : null;
    } catch (error) {
      loggers.error(error);
    }
  }

  async getByEmail(email) {

    try {
      let find = await this.model.findOne({ email: email });
      return find
        ? transformarDTO(
            this.generateDAOCompatible(await this.model.findOne(find))
          )
        : null;
    } catch (error) {
      loggers.error(error);
    }
  }

  async update(id, newObject) {
    try {
      this.replaceIDfor_ID(newObject);
      await this.model.updateOne({ _id: id }, newObject);
      return transformarDTO({ id: id, ...newObject });
    } catch (error) {
      loggers.error(error);
    }
  }

  async getAll() {

    try {
      const productos = await this.model.find();
      return transformarDTO(this.generateDAOCompatible(productos));
    } catch (error) {
      loggers.error(error);
    }
  }

  async deleteById(id) {

    try {
      await this.model.deleteOne({ _id: id });
      return id;
    } catch (error) {
      loggers.error(error);
    }
  }

  async deleteAll() {

    try {
      return await this.model.deleteMany({});
    } catch (error) {
      loggers.error(error);
    }
  }
}
