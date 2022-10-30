const express = require("express");
const routers = require("./routers");
/* const fs = require("fs"); */
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

const products = new Contenedor(optionsMySQL, 'productos');
const messages = new Contenedor(optionsSQLite, 'mensajes');

async function createTable() {
  try {
    await createTableMessages()
    await createTableProducts()
  } catch (error) {
    console.error(error.message)
  }

  const LoadMessages = await messages.getData();
  console.log(LoadMessages)
  !LoadMessages ?
    await messages.insertData(messagesDefault)
    :
    true;

  const LoadProducts = await products.getData();
  !LoadProducts ?
    await messages.insertData(productsDefault)
    :
    true;
}

createTable();

io.on("connection", async (socket) => {
  console.log(`usuario id "${socket.id}" conectado`);

  //AGREGADO DE PRODUCTOS
  const dataProducts = await products.getData();
  socket.emit("history-products", dataProducts)
  socket.on("nuevoProducto", async (data) => {
    /* data = JSON.parse(data); */
    products.insertData(data)
    const dataP = await products.getData()
    io.emit("productosActualizados", JSON.stringify(dataP))
  })

  //CENTRO DE MENSAJES - CHAT
  const dataMessages = await products.getData();
  socket.emit("history-messages", dataMessages);
  socket.on("chat message", async (data) => {
    /* data = JSON.parse(data); */
    messages.insertData(data);
    const dataM = await products.getData()
    io.emit("notification", JSON.stringify(dataM));
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
