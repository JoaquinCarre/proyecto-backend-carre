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
import os from "os";
import cluster from "cluster";
import minimist from 'minimist';
import { logger } from './logs/logger.js';

const argv = minimist(process.argv.slice(2), {
    default: { cluster: false },
    alias: { ec: 'cluster' }
  });
const ENABLE_CLUSTER = argv.cluster;

const app = express();

const server = createServer(app);

export const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

if (ENABLE_CLUSTER && cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        logger.info(`worker ${worker.process.pid} died`);
    });
} else {
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

    const PORT = process.env.PORT || 8080;

    server.listen(PORT, '0.0.0.0', () => {
        logger.info(
            `Servidor http esta escuchando en el puerto ${PORT}`
        );
        logger.info(`http://localhost:${PORT}`);
        logger.info(`Environment:${process.env.ENV}`);
    });

    server.on("error", (error) => logger.error(`Error en servidor ${error}`));
}