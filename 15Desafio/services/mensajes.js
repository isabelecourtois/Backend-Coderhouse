import express from "express";
import Contenedor from "../persistencia/Container.js"

export const mensajesContenedor = new Contenedor("./db/mensajes.txt");