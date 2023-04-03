import { productosNuevos } from "../models/DAOs/mockProductos.js"

export async function getFaker(req, res) {

    try {
        const productos = await productosNuevos(5);
        res.json( { productos: productos, });
        console.log(productos);
    } catch (error) {
        console.log(error);
    }

};

