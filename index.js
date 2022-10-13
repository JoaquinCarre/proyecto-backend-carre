const express = require('express')
const routers = require('./routers')
const fs = require('fs')
const path = require('path')
const handlebars = require('express-handlebars')

const app = express()

app.use('/', express.static(path.join(__dirname, '/public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const hbs = handlebars.create()
app.engine('handlebars', hbs.engine);

app.set('views', './views')
app.set('view engine', 'handlebars')

app.use('/api', routers) //indice nominal

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Algo está mal!')
  })

const server = app.listen(process.env.PORT, () => {
    console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
    console.log(`http://localhost:${server.address().port}`)
    console.log(`Environment:${process.env.ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

