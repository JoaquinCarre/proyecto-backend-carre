import mongoose from "mongoose";
import config from '../config/config.js';

//para conectar a mongoDB
await mongoose.connect(config.mongoDB.URI);

class ContainerMongoDB {
    constructor(modelName, schema) {
        this.collection = mongoose.model(modelName, schema)
    }

    getAll() {
        try {
            return this.collection.find({})
        } catch (error) {
            console.log('No es posible obtener los productos de la base de datos', error);
        }
    }

    async getByID(byId) {
        try {
            return this.collection.find({_id: byId})
        } catch (error) {
            console.log('No se puede obtener el producto solicitado', error);
        }
    }

    async addProduct(product) {
        try {
            const result = await this.collection.create(product)
            return result
        } catch (error) {
            console.log('No es posible guardar el articulo', error);
        }
    }

    async updateProduct(id, product) {
        try {

        } catch (error) {
            console.log('No es posible actualizar el articulo', error);
        }
    }

    async deleteProduct(id) {
        try {

        } catch (error) {
            console.log('No es posible borrar el articulo', error);
        }
    }

    async createCart() {
        try {

        } catch (error) {
            console.log('No es posible crear el carrito', error);
        }
    }

    async deleteCart(id) {
        try {

        } catch (error) {
            console.log('No es posible borrar el carrito', error);
        }
    }

    async addProductCart(id, product) {
        try {

        } catch (error) {
            console.log('No se puede agregar el producto', error);
        }
    }

    async deleteProductByID(id, idProduct) {
        try {

        } catch (error) {
            console.log('No se puede borrar el producto', error);
        }
    }
}

export default ContainerMongoDB;