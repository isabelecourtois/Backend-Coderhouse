import { productosNuevos } from "../persistencia/mockProductos.js"

export async function getFaker(req, res) {
    try {
        const productos = await productosNuevos(5);
        res.render("index", { productos: productos, });
        console.log(productos);
    } catch (error) {
        console.log(error);
    }

};

