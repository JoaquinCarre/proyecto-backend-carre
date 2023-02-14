import 'dotenv/config.js';
import express, { json, urlencoded } from 'express';
import { fileURLToPath } from 'url';
import path, { join } from 'path';
import session from 'express-session';
import MongoStore from "connect-mongo";
import config from "./config/mongoDBConfig.js";
import passport from 'passport';
import { initPassport } from './utils/passport.js';
import { create } from "express-handlebars";
import routers from './routers/index.js';
import params from './config/minimistConfig.js';
import os from "os";
import cluster from "cluster";
import { graphqlProducts/*,  graphqlUsers, graphqlMessages */ } from './graphql/graphql.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { MODE } = params;

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
  app.use('/graphql/products', graphqlProducts);
/*   app.use('/graphql/users', graphqlUsers);
  app.use('/graphql/messages', graphqlMessages); */

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Algo está mal!");
  });
}

export default app