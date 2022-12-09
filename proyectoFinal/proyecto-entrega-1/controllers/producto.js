import {prodContainer} from "../routes/productos.js";


export async function getProductos(req, res) {
    try {
        const productos = await prodContainer.getAll();
        res.json(productos);
    } catch (error) {
        console.log(error);
    }
};

export async function getProductosID(req, res) {
    const id = req.params.id;
    try {
        const producto = await prodContainer.getById(id);
        res.json(producto);
    } catch (error) {
        console.log(error);
    }
};

export async function postProducto(req, res) {
    const newProducto = {
        timestamp: Date.now(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        precio: req.body.precio,
        foto: req.body.foto,
        stock: req.body.stock,
    }
    const idNew = await prodContainer.save(newProducto);
    res.json({nuevoPorducto:idNew});
};

export async function putProducto(req, res) {
    const updatedProducto = {
        timestamp: Date.now(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        precio: req.body.precio,
        foto: req.body.foto,
        stock: req.body.stock,
    }
    const id = await prodContainer.update(req.params.id, updatedProducto);
    res.json({updatedProducto: [prodContainer.getById(id)]});
    }


export async function deleteProducto(req, res) {
   // const id = await productosContenedor.deleteById(req.params.id);
   // res.json({deletedProduct: id});
   res.json(prodContainer.deleteProducto(req.params.id));
}



/* module.exports = {
    getProductos,
    getProductosID,
    postProducto,
    putProducto,
    deleteProducto,
}; */