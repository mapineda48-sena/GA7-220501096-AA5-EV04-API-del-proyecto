import express from "express";
import logger from "morgan";
import { sync as connectDb } from "./models";
import personas from "./api/personas"

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para parsear JSON
app.use(logger("dev"))
app.use(personas);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


connectDb({
    host: '127.0.0.1',
    user: 'root',
    password: 'mi_contraseña',
    database: 'agape-app'
}).catch(error => {
    throw error
});