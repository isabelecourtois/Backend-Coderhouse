import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config()

const productsCollName = "productos";

const productsSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    nombre: {type: String, require: true, max: 150},
    foto: {type: String, require: true, max: 200},
    precio: {type: Number, require: true}
})

const connection = mongoose.createConnection(process.env.MONGO_CONTAINER, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export const productos = connection.model(productsCollName, productsSchema);