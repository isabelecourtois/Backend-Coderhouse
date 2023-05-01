import carroMem from "../DAO/carrito/memoria.js";
import carroMongo from "../DAO/carrito/mongo.js";
import { carroSchema } from "../schemas/carrito.js";
import { loggers } from "../../loggers/loggers.js";
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
        loggers.info("Carrito en Mongo");
        return new carroMongo(carroSchema);
        break;
      case "mem":
        loggers.info("Carrito en Memoria");
        return new carroMem();
        break;
      default:
        loggers.info("Carrito Default");
        return new carroMem();
        break;
    }
  }

}
