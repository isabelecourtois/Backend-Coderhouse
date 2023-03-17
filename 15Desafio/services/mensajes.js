import express from "express";
import Contenedor from "../Containers/Container.js"

export const mensajesContenedor = new Contenedor("./db/mensajes.txt");