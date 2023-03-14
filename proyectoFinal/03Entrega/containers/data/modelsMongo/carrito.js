import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config()

const carritoCollName = "carrito";

const carritoSchema = new mongoose.Schema({
  timestamp: {type: String, require: true, max: 15},
  productos: {type: Array, require: true, max: 150}
})

mongoose.connect(process.env.MONGO_PASSPORT,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export const carrito = mongoose.model(carritoCollName, carritoSchema);