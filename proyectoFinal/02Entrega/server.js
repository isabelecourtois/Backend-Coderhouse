import express from "express";
import prodRouter from "./routes/productos.js";
import cartRouter from "./routes/carito.js";

export const admin = true;

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", prodRouter);
app.use("/api/carrito", cartRouter);

app.use((req, res) => {
    res.status(404).json({
      error: -2,
      descripcion: `ruta '${req.originalUrl}' error  '${req.method}' `,
    });
  });
  
  
  app.listen(PORT, () => {
    console.log(`RUN http://localhost:${PORT}`);
  });