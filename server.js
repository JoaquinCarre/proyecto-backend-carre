const express = require('express');
const routers = require('./routers/index');
const fs = require('fs');
const path = require('path');
const handlebars = require('express-handlebars');
const productsRoutes = require('./routers/productRoutes');
const cartRoutes = require('./routers/cartRoutes');

const app = express()

app.use('/', express.static(path.join(__dirname, '/public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const hbs = handlebars.create()
app.engine('handlebars', hbs.engine);

app.set('views', './views')
app.set('view engine', 'handlebars')

app.use("/", routers);
app.use('/api/productos', productsRoutes);
app.use('/api/carrito', cartRoutes);
app.use('*', (req, res) => {
    const path = req.params;
    const method = req.method;
    res.send({ error: -2, descripcion: `ruta '${path[0]}' método '${method}' no implementada` });
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