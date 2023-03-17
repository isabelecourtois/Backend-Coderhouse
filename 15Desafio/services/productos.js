import { ContenedorSQL } from "../Containers/ContainerSQL.js"
import { optionsSqlite } from "./mysqlconn.js";
import { productosGuardados } from "../Containers/productos.js";

export const productosContenedor = new ContenedorSQL(optionsSqlite, "productos");
productosContenedor.crearTablaProductos()
  .then(() => {
    return productosContenedor.save(productosGuardados)
  })