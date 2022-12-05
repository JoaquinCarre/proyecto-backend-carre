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
            //sacar data de acá
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
            id = id.toString();
            return await this.collection.find({ _id: id }).lean();
        } catch (error) {
            console.log('No se puede obtener el producto solicitado', error);
        }
    }

    async getId(data) {
        try {
            return await data[0]._id.toString();
        } catch (error) {
            console.log('No se puede obtener ID')
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
            id = id.toString();
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
            id = id.toString();
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
                console.log('Carrito eliminado!')
                return data
            }
        } catch (error) {
            console.log('No es posible borrar el carrito', error);
        }
    }

    async addProductCart(id, product) {
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
                console.log('queproducto', product);
                await this.collection.updateOne({ _id: id }, { $push: { products: product } });
                const cartProducts = await this.collection.find({ _id: id }).lean();
                let cartTemplate = cartProducts[0].products;
                cartTemplate = cartTemplate.map(el =>({...el, _id : el._id.toString()}));
                console.log('añadiendo carttemplate', cartTemplate);
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
            /* } else {
                const isProduct = await this.collection.findOne({ products: { _id: idProduct } }).lean();
                console.log('producto a borrar: ', isProduct);
                if (!isProduct) {
                    const data = {
                        isEmpty: true,
                        message: `El producto no se encuentra en el carrito`,
                        status: 500
                    };
                    return data; */
                } else {
                await this.collection.updateOne({ _id: id }, { $pull: { products: { _id: idProduct } }}); //Esta lógica borra todos los productos que cumplan con la condición, agregar a futuro un campo de cantidad del mismo producto en el carrito
                let cartTemplate = await this.collection.findOne({ _id: id }).lean();
                console.log('cartTemplate', cartTemplate)
                cartTemplate = cartTemplate.products.map(el =>({...el, _id : el._id.toString()}))
                console.log('cart cambiado', cartTemplate);
                const data = {
                    cartTemplate,
                    isEmpty: !cartTemplate.length,
                    message: `No hay productos seleccionados`,
                    status: 200
                }
                return data;
                /* } */
            }
        } catch (error) {
            console.log('No se puede borrar el producto', error);
        }
    }
}

export default ContainerMongoDB;