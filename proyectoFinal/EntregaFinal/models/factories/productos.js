import ProdMem from "../DAO/productos/memoria.js";
import ProdMongo from "../DAO/productos/mongo.js";
import { prodSchema } from "../schemas/productos.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class ProdFactory {
  constructor() {
    if (!ProdFactory.instance) {
      ProdFactory.instance = this;
    }
    return ProdFactory.instance;
  }

  getDao() {
    switch (process.env.PERSISTENCE) {
      case "mongo":
        console.log("PERSISTENCE IN MONGO")
        return new ProdMongo(prodSchema);
        break;
      case "mem":
        console.log("PERSISTENCE IN MEMORY")
        return new ProdMem();
        break;
      default:
        console.log("PERSISTENCE DEFAULT (MEMORY)")
        return new ProdMem();
        break;
    }
  }

}
