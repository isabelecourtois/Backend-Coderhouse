import carroMem from "../DAO/carrito/memoria.js";
import carroMongo from "../DAO/carrito/mongo.js";
import { carroSchema } from "../schemas/carrito.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class carroFactory {
  constructor() {
    if (!carroFactory.instance) {
      carroFactory.instance = this;
    }
    return carroFactory.instance;
  }

  getDao() {
    switch (process.env.PERSISTENCE) {
      case "mongo":
        console.log("PERSISTENCE IN MONGO");
        return new carroMongo(carroSchema);
        break;
      case "mem":
        console.log("PERSISTENCE IN MEMORY");
        return new carroMem();
        break;
      default:
        console.log("PERSISTENCE DEFAULT (MEMORY)");
        return new carroMem();
        break;
    }
  }

}
