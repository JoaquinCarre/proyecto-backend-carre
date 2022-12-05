class ContainerMemory {
    constructor(products) {
        this.products = products;
        this.cart = [];
    }

    async getAll() {
        try {
            return this.products;
        } catch (error) {
            console.log('No es posible obtener los productos de la base de datos', error);
        }
    }

    async getByID(id) {
        try {
            const productId = await this.products.find(el => el._id === id);
            if (!productId) {
                throw new Error("Error en la búsqueda: producto no encontrado");
            } else {
                return productId;
            }
        } catch (error) {
            console.log('No se puede obtener el producto solicitado', error);
        }
    }

    async getId(data) {
        try {
            return await data[0]._id;
        } catch (error) {
            console.log('No se puede obtener ID', error);
        }
    }

    async addProduct(product) {
        try {
            const { title, description, price, thumbnail, stock } = product;
            if (title && description && price && thumbnail && stock) {
                const code = Math.random().toString(36).slice(1, 7);
                const addId = this.products[this.products.length - 1]._id + 1;
                const date = new Date();
                const newProduct = { ...product, code, _id: addId, timestamp: date };
                await this.products.push(newProduct);
                const productsTemplate = await this.products;
                const data = {
                    productsTemplate,
                    isEmpty: false,
                    isAdmin: true,
                    status: 200
                };
                return data;
            } else {
                const data = {
                    isEmpty: true,
                    message: "No es posible subir el producto, faltan datos",
                    status: 500
                };
                return data;
            }
        } catch (error) {
            console.log('No es posible guardar el articulo', error);
        }
    }

    async updateProduct(id, product) {
        try {
            const { title, description, price, thumbnail, stock } = product;
            if (title && description && price && thumbnail && stock) {
                await this.products.forEach((prod) => {
                    if (prod._id == id) {
                        prod.title = title
                        prod.description = description
                        prod.price = price
                        prod.thumbnail = thumbnail
                        prod.stock = stock
                    };
                });
                const productsTemplate = await this.products;
                const data = {
                    productsTemplate,
                    isEmpty: false,
                    isAdmin: true,
                    status: 200
                }
                return data;
            } else {
                const data = {
                    isEmpty: true,
                    message: "Hay campos incompletos",
                    status: 500
                }
                return data;
            }
        } catch (error) {
            console.log('No es posible actualizar el articulo', error);
        }
    }

    async deleteProduct(id) {
        try {
            const existProduct = await this.getByID(id);
            if (!existProduct.length) {
                const data = {
                    isEmpty: true,
                    message: "No existe el producto seleccionado",
                    status: 500
                }
                return data;
            } else {
                await this.products.forEach((prod, i) => {
                    if (prod._id == id) {
                        this.products.splice(i, 1);
                    };
                });
                const productsTemplate = await this.products;
                const data = {
                    productsTemplate,
                    isEmpty: false,
                    isAdmin: true,
                    status: 200
                };
                return data;
            }
        } catch (error) {
            console.log('No es posible borrar el articulo', error);
        }
    }

    async getAllCarts() {
        return this.cart
    }

    async createCart() {
        try {
            let addId;
            const date = new Date();
            const addedProducts = [];
            if (!this.cart.length) {
                addId = 1;
            } else {
                addId = this.cart[this.cart.length - 1]._id + 1;
            };
            const newCart = { _id: addId, timestamp: date, products: addedProducts };
            this.cart.push(newCart);
            return addId;
        } catch (error) {
            console.log('No es posible crear el carrito', error);
        }
    }

    async deleteCart(id) {
        try {
            let isCart = await this.cart.find(cartFind => cartFind._id == id);
            if (!isCart) {
                const data = {
                    isEmpty: true,
                    message: `Aún no has creado ningún carrito con el ID: ${id}`,
                    status: 500
                };
                return data;
            } else {
                const newCart = this.cart.filter(cartFilter => cartFilter._id != id);
                this.cart = newCart;
                const data = {
                    isEmpty: true,
                    message: `El carrito con el ID: ${id} fue eliminado`,
                    status: 200
                };
                return data;
            }
        } catch (error) {
            console.log('No es posible borrar el carrito', error);
        }
    }

    async addProductCart(id, product) {
        try {
            if(!this.cart.length) {
                console.log('Carrito nuevo creado');
                await this.createCart();
            }
            let isCart = await this.cart.find(cartFind => cartFind._id == id);
            if (!isCart) {
                const data = {
                    isEmpty: true,
                    message: `Carrito inexistente con el ID: ${id}`,
                    status: 500
                }
                return data;
            }
            const cartID = await this.cart.find(cartFind => cartFind._id == id);
            const cartIndex = this.cart.indexOf(cartID);
            await this.cart[cartIndex].products.push(product);
            const cartTemplate = await cart[cartIndex].products;
            const data = {
                cartTemplate,
                isEmpty: !cartTemplate.length,
                message: `No hay productos seleccionados`,
                status: 200
            }
            return data;

        } catch (error) {
            console.log('No se puede agregar el producto', error);
        }
    }

    async deleteProductByID(id, idProduct) {
        try {
            const cartID = await this.cart.find(cartFind => cartFind._id == id);
            if (!cartID) {
                const data = {
                    isEmpty: true,
                    message: `Carrito inexistente con el ID: ${id}`,
                    status: 500
                }
                return data;
            } else {
                const cartIndex = this.cart.indexOf(cartID);
                const productID = await this.cart[cartIndex].products.find(productFind => productFind._id == idProduct);
                if (!productID) {
                    const data = {
                        isEmpty: true,
                        message: `El producto no se encuentra en el carrito`,
                        status: 500
                    };
                    return data;
                } else {
                    const productIndex = await this.cart[cartIndex].products.indexOf(productID);
                    await this.cart[cartIndex].products.splice(productIndex, 1);
                    const cartTemplate = await this.cart[cartIndex].products;

                    const data = {
                        cartTemplate,
                        isEmpty: !cartTemplate.length,
                        message: `No hay productos seleccionados`,
                        status: 200
                    };
                    return data;
                }
            }
        } catch (error) {
            console.log('No se puede borrar el producto', error);
        }
    }
}

export default ContainerMemory;