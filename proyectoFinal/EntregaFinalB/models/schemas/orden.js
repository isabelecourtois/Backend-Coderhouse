import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config()

const ordenCN= "orden";

const Schema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    timestamp: {type: String, require: true, max: 30},
    usuario: {type: mongoose.Schema.Types.Mixed},
    carrito: {type: mongoose.Schema.Types.Mixed}
})

const connection = mongoose.createConnection(process.env.MONGO_CONTAINER, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export const ordenSchema = connection.model(ordenCN, Schema);