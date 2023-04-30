import ordenMongo from "../DAO/orden/mongo.js";
import ordenMem from "../DAO/orden/memoria.js"
import { ordenSchema } from "../schemas/orden.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class ordenFactory { 
  constructor() {
    if (!ordenFactory.instance) {
      ordenFactory.instance = this;
    }
    return ordenFactory.instance;
  }

  getDao() {
    switch (process.env.PERSISTENCE) {
      case "mongo":
        console.log("PERSISTENCE IN MONGO");
        return new ordenMongo(ordenSchema);
        break;
       case "mem":
        console.log("PERSISTENCE IN MEMORY");
         return new ordenMongo(ordenSchema);
         break;
      default:
        console.log("PERSISTENCE DEFAULT (MEMORY)");
         return new ordenMongo(ordenSchema);
         break;
    }
  }

}
