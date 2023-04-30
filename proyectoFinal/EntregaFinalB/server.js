import express from "express";
import { Server as HttpServer } from "http";
import dotenv from 'dotenv'
import cluster from "cluster";
import parseArgs from "minimist";
import productsR from "./routes/productos.js";
import cartR from "./routes/carrito.js";
import orderR from "./routes/orden.js";
import userR from "./routes/usuarios.js"
import { loggers } from "./loggers/loggers.js";

dotenv.config();

const app = express();
const httpServer = new HttpServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.use("/products", productsR);
app.use("/cart", cartR);
app.use("/order", orderR);
app.use("/user", userR);

const args = parseArgs(process.argv.slice(2));
loggers.info(args);

const serverM = args.serverMode || "Fork";
export const PORT = args.port ||process.env.PORT || 8080;

if (serverM === "Cluster" && cluster.isPrimary) {
  loggers.info(`Servidor express en ${PORT} - <b> PID: ${process.pid}</b> - ${new Date().toLocaleString()}`);

  for (let index = 0; index < 7; index++) {
    cluster.fork();

    cluster.on("exit", (worker, code, signal) => {
      loggers.info(`Worker ${worker.process.pid} died: ${new Date().toString()}`)
    });
  }
} else {

httpServer.listen(PORT, () => {
  loggers.info(`Servidor escuchando en el puerto ${PORT}`)
})}