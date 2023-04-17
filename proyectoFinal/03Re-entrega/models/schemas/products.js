import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config()

const productsCollName = "products";

const productsSchema = new mongoose.Schema({
    timestamp: {type: String, require: true, max: 30},
    nombre: {type: String, require: true, max: 150},
    descripcion: {type: String, require: true, max: 500},
    codigo: {type: String, require: true, max: 10},
    foto: {type: String, require: true, max: 200},
    precio: {type: Number, require: true},
    stock: {type: Number, require: true},
})

const connection = mongoose.createConnection(process.env.MONGO_CONTAINER, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//export const products = mongoose.model(productsCollName, productsSchema);
export const products = connection.model(productsCollName, productsSchema);