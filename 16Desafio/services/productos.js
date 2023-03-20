import { ContenedorSQL } from "../persistence/DAOs/ContainerSQL.js"
import { optionsSqlite } from "./mysqlconn.js";
import { productosGuardados } from "../persistence/DAOs/productos.js";

export const productosContenedor = new ContenedorSQL(optionsSqlite, "productos");
productosContenedor.crearTablaProductos()
  .then(() => {
    return productosContenedor.save(productosGuardados)
  })