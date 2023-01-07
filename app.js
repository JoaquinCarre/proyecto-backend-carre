import 'dotenv/config.js';
import express, { json, urlencoded } from 'express';
import routers from './routers/index.js';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import { create } from "express-handlebars";
import { createServer } from "http";
import { Server } from "socket.io";
import Contenedor from './contenedor.js';
/* import ContenedorMensajes from './contenedorArchivosMensajes.js' */
import fakerRoutes from './routers/fakerProducts.js';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from './models/user.js';
import { isValidPassword, encryptPassword } from './utils/passwordUtils.js'
import { initialMessages, optionsMySQL, createTableProducts } from './db-config/createTables.js';
//Agregado para el desafío 14: importar params y randoms
import params from './db-config/minimistConfig.js';
import randoms from './api/randoms.js';
import os from "os";
import cluster from "cluster";

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

  const io = new Server(server);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

//  app.use('/', express.static(join(__dirname, '/public')))
  app.use(json())
  app.use(urlencoded({ extended: true }))
  app.use(session({
    secret: '3cdXVD4#s7s7',
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use('sign-in', new LocalStrategy({
    usernameField: 'email',
  }, (email, password, done) => {
    UserModel.findOne({ email })
      .then((user) => {
        if (!user) {
          console.log(`User not foun with username ${email}`)
          return done(null, false)
        }
        if (!isValidPassword(user, password)) {
          console.log('Invalid Password')
          return done(null, false)
        }
        return done(null, user)
      })
      .catch(error => {
        console.log('Failed to sign in', error.message)
        done(error)
      })
  }))

  passport.use('sign-up', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
  }, (req, email, password, done) => {
    UserModel.findOne({ email })
      .then(user => {
        if (user) {
          console.log(`User ${email} already exists.`)
          return done(null, false)
        }
        const newUser = {
          ...req.body,
          password: encryptPassword(password)
        }
        UserModel.create(newUser)
          .then(newUser => {
            console.log(`User ${newUser.email} registration succesful.`)
            done(null, newUser)
          })
      })
      .catch(error => {
        console.log('Error in saving user: ', error.message)
        done(error)
      })
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((_id, done) => {
    UserModel.findOne({ _id })
      .then(user => done(null, user))
      .catch(done)
  })

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

  function setEvents() {
    io.on("connection", async (socket) => {
      console.log(`usuario id "${socket.id}" conectado`);
      await createTableProducts();
      const products = new Contenedor(optionsMySQL, 'productos');
      //AGREGADO DE PRODUCTOS
      const dataProducts = products.getData();
      socket.emit("history-products", await dataProducts)
      socket.on("nuevoProducto", async (data) => {
        products.insertData(data)
        console.log("carga de nuevo producto")
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
        console.log("usuario desconectado");
      });
    });
  }

  setEvents()

  //Agregado para el desafío 14: params.PORT
  server.listen(PORT, () => {
    console.log(
      `Servidor http esta escuchando en el puerto ${PORT}`
    );
    console.log(`http://localhost:${PORT}`);
    console.log(`Environment:${process.env.ENV}`);
  });

  server.on("error", (error) => console.log(`Error en servidor ${error}`));

}