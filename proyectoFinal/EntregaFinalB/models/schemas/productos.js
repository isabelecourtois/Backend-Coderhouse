import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config()

const prodCN = "products";

const Schema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
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

export const prodSchema = connection.model(prodCN, Schema);