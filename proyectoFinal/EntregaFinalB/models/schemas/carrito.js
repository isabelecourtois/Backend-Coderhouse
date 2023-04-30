import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config()

const carroCN = "carrito";

const Schema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    timestamp: {type: String, require: true, max: 30},
    productos: {type: Array, require: true, max: 150}
})

const connection = mongoose.createConnection(process.env.MONGO_CONTAINER, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export const carroSchema = connection.model(carroCN, Schema);