import express from "express";
import { createServer } from "http";
import { fileURLToPath } from 'url';
import path, { join } from 'path';
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import config from "./config/mongoDB.js";
import passport from 'passport';
import { initPassport } from './config/passport.js';
import { Server } from "socket.io";
import { setEvents } from './config/socket-io.js';
import { create } from "express-handlebars";
import indexRouter from './routers/indexRouter.js';

const app = express();

const server = createServer(app);

export const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.use('/', express.static(join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressSession({
    store: new MongoStore({
        mongoUrl: config.mongoDB.URI,
        ttl: 600
    }),
    secret: "abc123",
    rolling: true,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
initPassport();

const hbs = create();
app.engine("handlebars", hbs.engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use('/', indexRouter)

setEvents();

const PORT = 8080;

server.listen(PORT, () => {
    console.log(
        `Servidor http esta escuchando en el puerto ${PORT}`
    );
    console.log(`http://localhost:${PORT}`);
    console.log(`Environment:${process.env.ENV}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));