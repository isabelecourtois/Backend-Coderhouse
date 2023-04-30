import usuarioMem from "../DAO/usuario/memoria.js"
import usuarioMongo from "../DAO/usuario/mongo.js"
import { usuarioSchema } from "../schemas/usuario.js";
import { loggers } from "../../loggers/loggers.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class usuarioFactory {
  constructor() {
    if (!usuarioFactory.instance) {
      usuarioFactory.instance = this;
    }
    return usuarioFactory.instance;
  }

  getDao() {
    switch (process.env.PERSISTENCE) {
      case "mongo":
        loggers.info("User Persistence: Mongo")
        return new usuarioMongo(usuarioSchema);
        break;
      case "mem":
        loggers.info("User Persistence: Mem")
        return new usuarioMem();
        break;
      default:
        loggers.info("User Persistence: Default (Mem)")
        return new usuarioMem();
        break;
    }
  }

}
