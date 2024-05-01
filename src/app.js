import express, { json, urlencoded } from 'express';
import { productsRouter } from './routes/products.router.js';
import * as dotenv from 'dotenv'
import { cartRouter } from './routes/cart.router.js';
import cors from "cors"

dotenv.config()
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cors())

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`server started in http://localhost:${PORT}`));
server.on('error', (error) => console.log(`Error en el servidor: `, error.message));


//Routes
app.use("/api/productos", productsRouter)
app.use("/api/carrito", cartRouter)


app.use((req, res) => {
    res.status(404).json({error: "Not Found", description: `route ${req.baseUrl}${req.url} method ${req.method} not implement`});
});
