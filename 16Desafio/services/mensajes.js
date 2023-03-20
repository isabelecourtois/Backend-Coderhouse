import express from "express";
import Contenedor from "../persistence/DAOs/Container.js"

export const mensajesContenedor = new Contenedor("./db/mensajes.txt");