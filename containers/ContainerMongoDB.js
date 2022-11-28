import mongoose from "mongoose";
import config from '../config/config.js';

//para conectar a mongoDB
await mongoose.connect(config.mongoDB.URI);

class ContainerMongoDB {
    constructor(modelName, schema) {
        this.collection = mongoose.model(modelName, schema)
    }

    async getAll() {
        try {
            console.log('Tratando de obtener productos');
            const allProducts = await this.collection.find({}).lean();
            console.log('allProducts', allProducts);
            return allProducts;
        } catch (error) {
            console.log('No es posible obtener los productos de la base de datos', error);
        }
    }

    async getByID(id) {
        try {
            return await this.collection.find({ _id: id }).lean();
        } catch (error) {
            console.log('No se puede obtener el producto solicitado', error);
        }
    }

    async addProduct(product) {
        try {
            const { title, description, price, thumbnail, stock } = product
            if (title && description && price && thumbnail && stock) {
                const result = await this.collection.create(product)
                console.log('resultado addProduct', result)
                const productsTemplate = await result
                const data = {
                    productsTemplate,
                    isEmpty: false,
                    isAdmin: true,
                    status: 200
                }
                return data
            } else {
                const data = {
                    isEmpty: true,
                    message: "No es posible subir el producto, faltan datos",
                    status: 500
                }
                return data
            }
        } catch (error) {
            console.log('No es posible guardar el articulo', error);
        }
    }

    async updateProduct(id, product) {
        try {
            const { title, description, price, thumbnail, stock } = product
            if (title && description && price && thumbnail && stock) {
                const result = await this.collection.updateOne({ _id: id }, { $set: product });
                const productsTemplate = await this.getAll()
                const data = {
                    productsTemplate,
                    isEmpty: false,
                    isAdmin: true,
                    status: 200
                }
                return data
            } else {
                const data = {
                    isEmpty: true,
                    message: "Hay campos incompletos",
                    status: 500
                }
                return data
            }
        } catch (error) {
            console.log('No es posible actualizar el articulo', error);
        }
    }

    async deleteProduct(id) {
        try {
            const isProduct = await this.collection.find({ _id: id }).lean();
            if (!isProduct) {
                const data = {
                    isEmpty: true,
                    message: "No existe el producto seleccionado",
                    status: 500
                }
                return data
            } else {
                await this.collection.deleteOne({ _id: id });
                const productsTemplate = await this.getAll();
                const data = {
                    productsTemplate,
                    isEmpty: false,
                    isAdmin: true,
                    status: 200
                }
                return data
            }
        } catch (error) {
            console.log('No es posible borrar el articulo', error);
        }
    }

    async createCart() {
        try {
            const result = await this.collection.create({
                timestamp: Date.now(),
                products: []
            });
            console.log('id', result._id.toString());
            return result._id.toString();
        } catch (error) {
            console.log('No es posible crear el carrito', error);
        }
    }

    async deleteCart(id) {
        try {
            const isCart = await this.collection.find({ _id: id }).lean();
            if (!isCart) {
                const data = {
                    isEmpty: true,
                    message: "No existe el producto seleccionado",
                    status: 500
                }
                return data
            } else {
                const result = await this.collection.deleteOne({ _id: id });
                const productsTemplate = await this.getAll();
                const data = {
                    productsTemplate,
                    isEmpty: false,
                    isAdmin: true,
                    status: 200
                }
                return data
            }
        } catch (error) {
            console.log('No es posible borrar el carrito', error);
        }
    }

    async addProductCart(id, product) {
        try {
            const getCart = await this.getAll();
            if (!getCart.length) {
                console.log('Carrito nuevo creado');
                await this.createCart();
            }
            const cartByID = await this.getByID(id);
            if (!cartByID.length) {
                const data = {
                    isEmpty: true,
                    message: `Carrito inexistente con el ID: ${id}`,
                    status: 500
                }
                return data;
            } else {
                //Ver como coincidir el id que viene como un string con el id del producto buscado, agregando new ObjectId
                console.log('queproducto', product);
                await this.collection.updateOne({ _id: id }, { $push: { products: product } });
                const cartProducts = await this.collection.find({ _id: id }).lean();
                const cartTemplate = cartProducts[0].products;
                const data = {
                    cartTemplate,
                    isEmpty: !cartTemplate.length,
                    message: `No hay productos seleccionados`,
                    status: 200
                }
                return data;
            }
        } catch (error) {
            console.log('No se puede agregar el producto', error);
        }
    }

    async deleteProductByID(id, idProduct) {
        try {
            const cartByID = await this.getByID(id);
            if (!cartByID.length) {
                const data = {
                    isEmpty: true,
                    message: `Carrito inexistente con el ID: ${id}`,
                    status: 500
                }
                return data;
            } else {
                const isProduct = await this.carrito.findOne({ $and: [{ _id: id }, { "products": { _id: idProduct } }] }).lean();
                if (!isProduct) {
                    const data = {
                        isEmpty: true,
                        message: `El producto no se encuentra en el carrito`,
                        status: 500
                    };
                    return data;
                } else {
                    const result = await this.carrito.updateOne({ _id: id }, { $unset: { "products": { _id: idProduct } } });
                    const cartTemplate = await this.carrito.findOne({ _id: id }).lean();
                    const data = {
                        cartTemplate,
                        isEmpty: !cartTemplate.length,
                        message: `No hay productos seleccionados`,
                        status: 200
                    }
                    return data;
                }
            }
        } catch (error) {
            console.log('No se puede borrar el producto', error);
        }
    }
}

export default ContainerMongoDB;