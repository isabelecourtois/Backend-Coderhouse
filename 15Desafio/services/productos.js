import { ContenedorSQL } from "../persistencia/ContainerSQL.js"
import { optionsSqlite } from "./mysqlconn.js";
import { productosGuardados } from "../persistencia/productos.js";

export const productosContenedor = new ContenedorSQL(optionsSqlite, "productos");
productosContenedor.crearTablaProductos()
  .then(() => {
    return productosContenedor.save(productosGuardados)
  })