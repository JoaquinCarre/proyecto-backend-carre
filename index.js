const express = require("express");
const routers = require("./routers");
const fs = require("fs");
const path = require("path");
const handlebars = require("express-handlebars");
const http = require("http");
const { Server } = require("socket.io");

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

const messages = [
  {
    email: "Servidor",
    message: "Bienvenidos al Chat público"
  },
];

function setEvents() {
  io.on("connection", (socket) => {
    console.log(`usuario id "${socket.id}" conectado`);
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

setEvents ()

server.listen(process.env.PORT, () => {
  console.log(
    `Servidor http esta escuchando en el puerto ${server.address().port}`
  );
  console.log(`http://localhost:${server.address().port}`);
  console.log(`Environment:${process.env.ENV}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
