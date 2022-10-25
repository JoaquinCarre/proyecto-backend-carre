const fs = require('fs');

class Contenedor {
    constructor(fileJSON) {
        this.fileJSON = fileJSON;
    }

    async getAll() {
        try {
            const products = await fs.promises.readFile(this.fileJSON, 'utf-8')
            return await JSON.parse(products)
        } catch (error) {
            console.log('No es posible obtener los productos de la base de datos', error);
        }
    }

    async getByID(id) {
        try {
            const products = await this.getAll();
            const oneProduct = await products.filter((el) => el.id == id)
            return oneProduct
        } catch (error) {
            console.log('No se puede obtener el producto solicitado', error);
        }
    }

    async addProduct(product) {
        try {
            const products = await this.getAll();
            const { title, description, price, thumbnail, stock } = product
            if (title && description && price && thumbnail && stock) {
                const code = Math.random().toString(36).slice(1, 7)
                const id = products.length + 1
                const date = new Date();
                const newProduct = { ...product, code, id, timestamp: date }
                await products.push(newProduct)
                await fs.promises.writeFile(this.fileJSON, JSON.stringify(products))
                const productsTemplate = await products
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
            const products = await this.getAll();
            const { title, description, price, thumbnail, stock } = product
            if (title && description && price && thumbnail && stock) {
                await products.forEach((prod) => {
                    if (prod.id == id) {
                        prod.title = title
                        prod.description = description
                        prod.price = price
                        prod.thumbnail = thumbnail
                        prod.stock = stock
                    }
                });
                await fs.promises.writeFile(this.fileJSON, JSON.stringify(products))
                const productsTemplate = await products
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
            const products = await this.getAll();
            const existProduct = await this.getByID(id)
            if (!existProduct.length) {
                const data = {
                    isEmpty: true,
                    message: "No existe el producto seleccionado",
                    status: 500
                }
                return data
            } else {
                await products.forEach((prod, i) => {
                    if (prod.id == id) {
                        products.splice(i, 1)
                    }
                });
                await fs.promises.writeFile(this.fileJSON, JSON.stringify(products))
                const productsTemplate = await products
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
            const cart = await this.getAll();
            let id;
            const date = new Date();
            const products = [];
            if (!cart.length) {
                id = 1;
            } else {
                id = cart[cart.length - 1].id + 1
            }
            const newCart = { id, timestamp: date, products: products }
            await cart.push(newCart)
            await fs.promises.writeFile(this.fileJSON, JSON.stringify(cart))
            return id
        } catch (error) {
            console.log('No es posible crear el carrito', error);
        }
    }

    async deleteCart(id) {
        try {
            const cart = await this.getAll();
            console.log(cart)
            let isCart = await cart.find(cartFind => cartFind.id == id);
            if (!isCart) {
                const data = {
                    isEmpty: true,
                    message: `Aún no has creado ningún carrito con el ID: ${id}`,
                    status: 500
                }
                return data;
            } else {
                const newCart = cart.filter(cartFilter => cartFilter.id != id);
                await fs.promises.writeFile(this.fileJSON, JSON.stringify(newCart));
                const data = {
                    isEmpty: true,
                    message: `El carrito con el ID: ${id} fue eliminado`,
                    status: 200
                }
                return data;
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
                const cart = await this.getAll();
                const cartID = await cart.find(cartFind => cartFind.id == id);
                const cartIndex = await cart.indexOf(cartID)
                await cart[cartIndex].products.push(product);
                await fs.promises.writeFile(this.fileJSON, JSON.stringify(cart))
                const cartTemplate = await cart[cartIndex].products
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
            console.log(idProduct)
            const cart = await this.getAll();
            const cartID = await cart.find(cartFind => cartFind.id == id);
            if (!cartID) {
                const data = {
                    isEmpty: true,
                    message: `Carrito inexistente con el ID: ${id}`,
                    status: 500
                }
                return data;
            } else {
                const cartIndex = await cart.indexOf(cartID);
                const productID = await cart[cartIndex].products.find(productFind => productFind.id == idProduct)
                console.log(productID)
                console.log(cart[cartIndex].products);
                if (!productID) {
                    const data = {
                        isEmpty: true,
                        message: `El producto no se encuentra en el carrito`,
                        status: 500
                    }
                    return data;
                } else {
                    const productIndex = await cart[cartIndex].products.indexOf(productID);
                    console.log(productIndex);
                    await cart[cartIndex].products.splice(productIndex, 1);
                    console.log(cart[cartIndex].products);
                    await fs.promises.writeFile(this.fileName, JSON.stringify(cart));
                    const cartTemplate = await cart[cartIndex].products;
                    console.log(cartTemplate)
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

module.exports = Contenedor;