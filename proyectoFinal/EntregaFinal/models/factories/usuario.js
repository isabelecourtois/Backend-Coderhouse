import usuarioMem from "../DAO/usuario/memoria.js"
import usuarioMongo from "../DAO/usuario/mongo.js"
import { usuarioSchema } from "../schemas/usuario.js";
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
        console.log("PERSISTENCE IN MONGO")
        return new usuarioMongo(usuarioSchema);
        break;
      case "mem":
        console.log("PERSISTENCE IN MEMORY")
        return new usuarioMem();
        break;
      default:
        console.log("PERSISTENCE DEFAULT (MEMORY)")
        return new usuarioMem();
        break;
    }
  }

}
