const express = require("express");
const routers = require("./routers");
const fs = require("fs");
const path = require("path");
const handlebars = require("express-handlebars");
const http = require("http");
const { Server } = require("socket.io");
/* const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); */

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
const products = [
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

/* function fetchFile() {
  fetch('./productos.json')
  .then( res => res.json())
  .then( (resp) => {console.log(resp); socket.emit("history-products", resp)})
  .catch ((err) => {
    console.log('(error de lectura: ', err);
  })
} */

//CENTRO DE MENSAJES - CHAT
const messages = [
  {
    email: "Servidor",
    message: "Bienvenidos al Chat público"
  },
];

function setEvents() {
  io.on("connection", (socket) => {
    console.log(`usuario id "${socket.id}" conectado`);

    //AGREGADO DE PRODUCTOS
    /* fetchFile() */
    socket.emit("history-products", products)
    socket.on("nuevoProducto", async (data) => {
      products.push(data)
      io.emit("productosActualizados", data)
    })

    //CENTRO DE MENSAJES - CHAT
    socket.emit("history-messages", messages);
    socket.on("chat message", (data) => {
      messages.push(data);
      io.emit("notification", data);
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
