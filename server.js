import app from "./app.js";
import params from './config/minimistConfig.js';
import { createServer } from "http";
import { setEvents } from './utils/socket-io.js';

const { PORT } = params;

const server = createServer(app);

setEvents(server);

server.listen(PORT, () => {
    console.log(
        `Servidor http esta escuchando en el puerto ${PORT}`
    );
    console.log(`http://localhost:${PORT}`);
    console.log(`Environment:${process.env.ENV}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));