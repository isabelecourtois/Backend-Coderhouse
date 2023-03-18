import { userMongo } from "../db/usuarioPassport.js";
import ContainerMongo from "../containers/ContainerMongo.js";

export const userContainer = new ContainerMongo (userMongo);