import { io } from "../app.js";
import ProductController from "../controller/productController.js";

function setEvents() {
    io.on("connection", async (socket) => {
        console.log(`usuario id "${socket.id}" conectado`);
        //AGREGADO DE PRODUCTOS
        const dataProducts = await ProductController.get({});
        socket.emit("history-products", dataProducts)
        socket.on("nuevoProducto", async (data) => {
            ProductController.create(data)
            console.log("carga de nuevo producto")
            io.sockets.emit("productosActualizados", data)
        })

        socket.on("disconnect", () => {
            console.log("usuario desconectado");
        });
    });
}

export { setEvents };