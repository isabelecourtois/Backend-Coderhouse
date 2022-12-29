import mongoose from "mongoose";

const carritoCollName = "carrito";

const carritoSchema = new mongoose.Schema({
    timestamp: {type: String, require: true, max: 15},
})

export const products = mongoose.model(productsCollName, productsSchema);