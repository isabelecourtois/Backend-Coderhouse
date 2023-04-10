import {args} from "../server.js"

export function getInfo (req, res) {
  res.send(`<h2>Argumentos de entrada: ${args}</h2>
  <h2>Nombre de la plataforma (sist op): ${process.platform}</h2>
  <h2>Version de node.js: ${process.version}</h2>
  <h2>Memoria total reservada (rss): ${process.memoryUsage().heapUsed}</h2>
  <h2>Path de ejecución: ${process.cwd()}</h2>
  <h2>Process id: ${process.pid}</h2>
  <h2>Carpeta del proyecto: ${process.cwd().split("\\").pop()}</h2>`)
}

