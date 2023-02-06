import { Server } from "socket.io";
import { getAll as getAllProducts , addProduct } from "../services/productServices.js";
import messageAPI from '../controllers/messagesController.js';
import { logger } from "../logs/logger.js";
import normalizr from "normalizr";
import { postSchema } from "../models/schema/message.js";

function setEvents(server) {
    const io = new Server(server);

    io.on("connection", async (socket) => {
        logger.info(`usuario id "${socket.id}" conectado`);

        //AGREGADO DE PRODUCTOS
        const dataProducts = await getAllProducts();
        socket.emit("history-products", dataProducts);
        socket.on("nuevoProducto", async (data) => {
            addProduct(data);
            logger.info("Se carga un nuevo producto");
            io.sockets.emit("productosActualizados", data);
        })

        //CENTRO DE MENSAJES - CHAT
        const messages = await messageAPI.readAllMessagesNormalized();
        let normalizedSize = JSON.stringify(messages).length;
        const denormalized = normalizr.denormalize(messages.result, postSchema, messages.entities);
        let denormalizedSize = JSON.stringify(denormalized).length;
        console.log('desglose data: ', normalizedSize, '/', denormalizedSize)
        const outputValue = ((1 - normalizedSize / denormalizedSize) * 100).toFixed(2);
        console.log('mensajes socket-io', denormalized, '/', outputValue);
        socket.emit("history-messages", { denormalized, outputValue });
        socket.on("chat message", async (data) => {
            console.log('devuelve chat message: ', data)
            await messageAPI.sendNewMessage(data);
            const messagesNormalized = await messageAPI.readAllMessagesNormalized();
            let normalizedSize = JSON.stringify(messagesNormalized).length;
            const denormalized = normalizr.denormalize(messagesNormalized.result, postSchema, messagesNormalized.entities);
            let denormalizedSize = JSON.stringify(denormalized).length;
            const outputValue = ((1 - normalizedSize / denormalizedSize) * 100).toFixed(2);
            io.sockets.emit("notification", { messagesNormalized, outputValue });
        });

        socket.on("disconnect", () => {
            logger.info("usuario desconectado");
        });
    });
}

export { setEvents };