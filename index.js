const fs = require('fs')
const express = require ('express')

const app = express ()

const PORT = 8080

const server = app.listen (PORT, ()=>{
    console.log (`Servidor HTTP escuchado en el puerto ${server.address().port}`)
})

server.on ("error", error => console.log (`Error en servidor ${error}`))

async function readFile () {
    try {const readFile = await fs.promises.readFile('./productos.txt')
        const readFileJSON = await JSON.parse(readFile)
        return await readFileJSON}
    catch (err) {
        console.log ('error de lectura: ', err)
    }
}

class Contenedor {
    async getAll () {
        try {const products = await readFile()
            return products}
        catch (err) {
            console.log ('error de lectura: ', err)
        }
    }

    async getByRandomId (numberId) {
        try {const products = await readFile()
            return await products.filter ((el)=>el.id === numberId)}
        catch (err) {
            console.log ('error de lectura: ', err)
        }
    }
}

const productos = new Contenedor ()

function randomNumber () {
    const numberId = Math.floor(Math.random() * (3 - 1) + 1)
    return numberId
}

app.get ('/', (req,res)=> {
    res.send('<ul><li><a href="/productos">Productos</a></li><li><a href="/productoRandom">Producto Random</a></li></ul>')
})

app.get ('/productos', (req,res)=> {
    res.json(productos.getAll())
})

app.get ('/productoRandom', async (req,res)=> {
    const idNumber = randomNumber ()
    res.json(productos.getByRandomId(idNumber))
})