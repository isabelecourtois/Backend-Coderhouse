import mongoose from "mongoose";

const messagesCollName = "menssages";

const messagesSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    nombre: {type: String, require: true, max: 150},
    apellido: {type: String, require: true, max: 50}, 
    mail: {type: String, require: true, max: 100},
    edad: {type: String, require: true, max: 50},
    alias: {type: String, require: true, max: 50},
    avatar: {type: String, require: true, max: 200},
    message: {type: String, require: true, max: 200},
    dateAndTime: {type: String, require: true, max: 50},
})

export const mensajes = mongoose.model(messagesCollName, messagesSchema);