import { io } from "../app.js";
import ProductController from "../controller/productController.js";
import { logger } from "../logs/logger.js";

function setEvents() {
    io.on("connection", async (socket) => {
        logger.info(`usuario id "${socket.id}" conectado`);
        //AGREGADO DE PRODUCTOS
        const dataProducts = await ProductController.get({});
        socket.emit("history-products", dataProducts)
        socket.on("nuevoProducto", async (data) => {
            ProductController.create(data)
            logger.info("Se carga un nuevo producto")
            io.sockets.emit("productosActualizados", data)
        })

        socket.on("disconnect", () => {
            logger.info("usuario desconectado");
        });
    });
}

export { setEvents };