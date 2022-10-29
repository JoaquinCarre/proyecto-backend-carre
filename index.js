const express = require("express");
const routers = require("./routers");
/* const fs = require("fs"); */
const path = require("path");
const handlebars = require("express-handlebars");
const http = require("http");
const { Server } = require("socket.io");
const Contenedor = require('./contenedor');

import {
  optionsSQLite,
  createTableMessages,
  optionsMySQL,
  createTableProducts
} from '../db-config/createTables.js'


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

app.use("/", routers); //indice nominal

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Algo está mal!");
});

//AGREGADO DE PRODUCTOS
const productsDefault = [
  {
    title: "Iphone X-18",
    price: 339.40,
    thumbnail: "https://cdn1.iconfinder.com/data/icons/colored-hand-phone/96/android-mobile_phone-256.png",
    id: 1
  },
  {
    title: "Procesador Intel i6 1ºGen",
    price: 120,
    thumbnail: "https://cdn4.iconfinder.com/data/icons/computer-and-technologies-1/800/Microprocessor-512.png",
    id: 2
  },
  {
    title: "Teclado Gamer XYZ Pro",
    price: 10,
    thumbnail: "https://cdn4.iconfinder.com/data/icons/computer-and-technologies-1/800/keyboard-512.png",
    id: 3
  }
]


//CENTRO DE MENSAJES - CHAT
const messagesDefault = [
  {
    email: "Servidor",
    message: "Bienvenidos al Chat público"
  },
];

try {
  await createTableMessages()
  await createTableProducts()
} catch (error) {
  console.error(error.message)
}

const products = new Contenedor(optionsMySQL, 'products');
const messages = new Contenedor(optionsSQLite, 'messages');

const LoadMessages = await messages.getData();
!LoadMessages ?
  await messages.insertData(messagesDefault)
  :
  LoadMessages=LoadMessages;

const LoadProducts = await products.getData();
!LoadProducts ?
  await messages.insertData(productsDefault)
  :
  LoadProducts=LoadProducts;


io.on("connection", async (socket) => {
  console.log(`usuario id "${socket.id}" conectado`);

  //AGREGADO DE PRODUCTOS
  const dataProducts = await products.getAll();
  socket.emit("history-products", dataProducts)
  socket.on("nuevoProducto", async (data) => {
    products.insertData(data)
    io.emit("productosActualizados", data)
  })

  //CENTRO DE MENSAJES - CHAT
  const dataMessages = await products.getAll();
  socket.emit("history-messages", dataMessages);
  socket.on("chat message", (data) => {
    messages.insertData(data);
    io.emit("notification", data);
  });
  socket.on("disconnect", () => {
    console.log("usuario desconectado");
  });
});

server.listen(process.env.PORT, () => {
  console.log(
    `Servidor http esta escuchando en el puerto ${server.address().port}`
  );
  console.log(`http://localhost:${server.address().port}`);
  console.log(`Environment:${process.env.ENV}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
