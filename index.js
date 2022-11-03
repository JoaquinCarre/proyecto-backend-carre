const express = require("express");
const routers = require("./routers");
const path = require("path");
const handlebars = require("express-handlebars");
const http = require("http");
const { Server } = require("socket.io");
const Contenedor = require('./contenedor');

const {
  optionsSQLite,
  createTableMessages,
  optionsMySQL,
  createTableProducts
} = require('./db-config/createTables.js')


const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.use("/", express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = handlebars.create();
app.engine("handlebars", hbs.engine);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/", routers);

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
    await createTableMessages();
    const messages = new Contenedor(optionsSQLite, 'mensajes');
    const dataMessages = await messages.getData();
    socket.emit("history-messages", dataMessages);
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
