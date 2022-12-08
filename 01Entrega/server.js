import express from "express";
import routerProyecto from  "./routes/proyecto.js";

export const admin = false;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routerProyecto)

app.use((req, res) => {
    res.json({error, description: "Ruta no existente " + req.originalUrl});
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening in ${PORT}`));

