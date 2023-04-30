import express from "express";
import Contenedor from "../models/DAOs/Container.js"

export const mensajesContenedor = new Contenedor("./db/mensajes.txt");