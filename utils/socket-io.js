import { Server } from "socket.io";
import { productDB } from "../db/index.js";
import { logger } from "../logs/logger.js";

function setEvents(server) {
    const io = new Server(server);

    io.on("connection", async (socket) => {
        logger.info(`usuario id "${socket.id}" conectado`);
        //AGREGADO DE PRODUCTOS
        const dataProducts = await productDB.get({});
        socket.emit("history-products", dataProducts)
        socket.on("nuevoProducto", async (data) => {
            productDB.create(data)
            logger.info("Se carga un nuevo producto")
            io.sockets.emit("productosActualizados", data)
        })

        //CENTRO DE MENSAJES - CHAT
        /* await initialMessages();
        const messages = new ContenedorMensajes();
        const dataMessages = await messages.getMessage();
        console.log(dataMessages);
        socket.emit("history-messages", JSON.stringify(dataMessages));
        socket.on("chat message", async (data) => {
          console.log("data", data);
          messages.insertData(data);
          io.sockets.emit("notification", data);
        }); */

        socket.on("disconnect", () => {
            logger.info("usuario desconectado");
        });
    });
}

export { setEvents };