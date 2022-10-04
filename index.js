const express = require('express')
const routers = require('./routers')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/api', routers) //indice nominal

const server = app.listen(process.env.PORT, () => {
    console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
    console.log(`http://localhost:${server.address().port}`)
    console.log(`Environment:${process.env.ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))