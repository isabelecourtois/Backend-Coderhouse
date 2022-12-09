import express from "express";
import  {Router} from "express";
import prodRouter from  "./routes/productos.js";
import carritoRouter from  "./routes/carrito.js";

export const admin = false;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use("/api", routerProyecto)

app.use("/api/productos", prodRouter);
app.use("/api/carrito", carritoRouter);

app.use((req, res) => {
    res.status(404).json({
      error: -2,
      descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
    });
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening in ${PORT}`));

