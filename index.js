import express, { json, urlencoded } from 'express';
import routers from './routers/index.js';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import { create } from "express-handlebars";
import { createServer } from "http";
import { Server } from "socket.io";
import Contenedor from './contenedor.js';
import ContenedorMensajes from './contenedorArchivosMensajes.js'
import fakerRoutes from './routers/fakerProducts.js';

import { initialMessages, optionsMySQL, createTableProducts } from './db-config/createTables.js';


const app = express();

const server = createServer(app);

const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/', express.static(join(__dirname, '/public')))
app.use(json())
app.use(urlencoded({ extended: true }))

const hbs = create();
app.engine("handlebars", hbs.engine);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/", routers);
app.use("/api/productos-test", fakerRoutes)

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Algo está mal!");
});

function setEvents() {
  io.on("connection", async (socket) => {
    console.log(`usuario id "${socket.id}" conectado`);
    await createTableProducts();
    const products = new Contenedor(optionsMySQL, 'productos');
    //AGREGADO DE PRODUCTOS
    const dataProducts = products.getData();
    socket.emit("history-products", await dataProducts)
    socket.on("nuevoProducto", async (data) => {
      products.insertData(data)
      console.log("carga de nuevo producto")
      io.sockets.emit("productosActualizados", data)
    })

    //CENTRO DE MENSAJES - CHAT
    await initialMessages();
    const messages = new ContenedorMensajes();
    const dataMessages = await messages.getMessage();
    console.log(dataMessages);
    socket.emit("history-messages", JSON.stringify(dataMessages));
    socket.on("chat message", async (data) => {
      console.log("data", data);
      messages.insertData(data);
      io.sockets.emit("notification", data);
    });
    socket.on("disconnect", () => {
      console.log("usuario desconectado");
    });
  });
}

setEvents()

server.listen(process.env.PORT, () => {
  console.log(
    `Servidor http esta escuchando en el puerto ${server.address().port}`
  );
  console.log(`http://localhost:${server.address().port}`);
  console.log(`Environment:${process.env.ENV}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
