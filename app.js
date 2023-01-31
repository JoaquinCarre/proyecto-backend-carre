import 'dotenv/config.js';
import express, { json, urlencoded } from 'express';
import { createServer } from "http";
import { fileURLToPath } from 'url';
import path, { join } from 'path';
import session from 'express-session';
import MongoStore from "connect-mongo";
import config from "./config/mongoDBConfig.js";
import passport from 'passport';
import { initPassport } from './utils/passport.js';
import { setEvents } from './utils/socket-io.js';
import { create } from "express-handlebars";
import routers from './routers/index.js';
import fakerRoutes from './routers/fakerProducts.js';
import params from './config/minimistConfig.js';
import randoms from './api/randoms.js';
import os from "os";
import cluster from "cluster";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const { PORT, MODE } = params;

if (MODE === 'cluster' && cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} | code ${code} | signal ${signal}`);
    console.log('Starting a new worker...');
    cluster.fork();
  })
} else {
  const app = express();

  const server = createServer(app);

  app.use('/', express.static(join(__dirname, '/public')))
  app.use(json())
  app.use(urlencoded({ extended: true }))
  app.use(session({
    store: new MongoStore({
        mongoUrl: config.mongoDB.URI,
        ttl: 600
    }),
    secret: "3cdXVD4#s7s7",
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

  app.use("/", routers);
  app.use('/api', randoms);
  app.use("/api/productos-test", fakerRoutes)

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Algo está mal!");
  });

  setEvents(server);

  server.listen(PORT, () => {
    console.log(
      `Servidor http esta escuchando en el puerto ${PORT}`
    );
    console.log(`http://localhost:${PORT}`);
    console.log(`Environment:${process.env.ENV}`);
  });

  server.on("error", (error) => console.log(`Error en servidor ${error}`));

}