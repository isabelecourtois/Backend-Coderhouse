import mensajesDAOFS from "../DAOs/mensajesDAOFS";
import mensajesDAOMongo from "../DAO/productosDAOMongo";
import { mensajes } from "../schemas/mensajes.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class mensajesFactory {
  constructor(){
    this.date = Date.now()
  }

  getDao() {
    switch (process.env.METODODB) {
      case "MDB":
        console.log("MDB")
        return new mensajesDAOMongo(mensajes);
        break;
      case "FS":
        console.log("FS")
        return new mensajesDAOFS();
        break;
      default:
        console.log("DEFAULT FS")
        return new mensajesDAOFS();
        break;
    }
  }

  static getNOC() {
    if(!this.npc) {
      this.npc = new mensajesFactory()
    }
    return this.npc;
  }
}
