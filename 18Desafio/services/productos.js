import ProductosRepo from "../models/repository/productos.js";


export const productosContenedor = new ProductosRepo ()
console.log(productosContenedor);

/* productosContenedor.crearTablaProductos()
  .then(() => {
    return productosContenedor.save(productosGuardados)
  }) */