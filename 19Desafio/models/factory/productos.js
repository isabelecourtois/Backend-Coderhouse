import productosMongo from "../DAOs/productosDAOMongo.js"
import { productos } from "../schemas/producto.js";
import productosFS from "../DAOs/productosDAOMongo.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class productosFactory {
    constructor() {
        this.date = Date.now()
    }

    getDao() {

        switch (process.env.METODODB) {

            case "FS":
                console.log("FS")
                return new productosFS();
                break;
                
            case "MDB":
                console.log("MDB")
                return new productosMongo(productos);
                break;
            
            default:
                console.log("DEFAULT FS")
                return new productosFS();
                break;
        }
        
    }

    static getNPC() {
        if (!this.npc) {
            this.npc = new productosFactory()
        }
        return this.npc;
    }
}
console.log(productosFactory);