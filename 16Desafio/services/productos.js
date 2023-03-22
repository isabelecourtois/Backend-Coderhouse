import ProductosRepo from "../models/repository/productos.js";


export const productosContenedor = new ProductosRepo ()

/* productosContenedor.crearTablaProductos()
  .then(() => {
    return productosContenedor.save(productosGuardados)
  }) */