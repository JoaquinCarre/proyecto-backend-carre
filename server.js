import express, { json, urlencoded } from 'express';
import routers from './routes/index.js';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import { create } from 'express-handlebars';
import productsRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

const app = express()

//se crea la constante __dirname ya que, al agregar "type":"modules" al package.json la variable global __dirname pasa a no estar habilitada en los archivos modulares de ECMAScript
//fileURLToPath retorna el path completo del archivo para Node.js
//import.meta es un objeto que contiene metadata específica para los módulos tal como el módulo URL (import.meta.url)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/', express.static(join(__dirname, '/public')))
app.use(json())
app.use(urlencoded({ extended: true }))

const hbs = create()
app.engine('handlebars', hbs.engine);

app.set('views', './views')
app.set('view engine', 'handlebars')

app.use("/", routers);
app.use('/api/productos', productsRoutes);
app.use('/api/carrito', cartRoutes);
app.use('*', (req, res) => {
    const path = req.params;
    const method = req.method;
    res.send({ error: -1, descripcion: `ruta '${path[0]}' método '${method}' no implementada` });
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Algo está mal!')
})

const server = app.listen(process.env.PORT || 8080, () => {
    console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
    console.log(`http://localhost:${server.address().port}`)
    console.log(`Environment:${process.env.ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))