import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const cert = JSON.parse(await readFile(
    new URL('./backend-coderhouse-9b915-firebase-adminsdk-ab3n2-33d0a55edb.json', import.meta.url)
))

admin.initializeApp({ credential: admin.credential.cert(cert) });
console.log('Base Firebase Conectada!');

const db = admin.firestore();

class ContainerFirebase {
    constructor(collection) {
        this.collection = db.collection(collection);
    }

    async getAll() {
        try {
            const querySnapshot = await this.collection.get();
            const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            console.log('Se obtienen los siguientes productos: ', products);
            return products;
        } catch (error) {
            console.log('No es posible obtener los productos de la base de datos', error);
        }
    }

    async getByID(id) {
        try {
            const doc = this.collection.doc(id);
            const item = await doc.get();
            const response = [item.data()];
            console.log('Elemento obtenido por id: ', response);
            return response;
        } catch (error) {
            console.log('No se puede obtener el producto solicitado', error);
        }
    }

    async getId(data) {
        try {
            console.log('el id que obtengo es: ', await data[0].id)
            return await data[0].id;
        } catch (error) {
            console.log('No se puede obtener ID')
        }
    }

    async addProduct(product) {
        try {
            const { title, description, price, thumbnail, stock } = product
            if (title && description && price && thumbnail && stock) {
                let id = uuidv4();
                const doc = this.collection.doc(id);
                await doc.create(product);
                console.log('Producto añadido');
                const productsTemplate = await this.getAll();
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
                const doc = this.collection.doc(id);
                await doc.update(product);
                const productsTemplate = await this.getAll();
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
            const existProduct = await this.getByID(id)
            if (!existProduct.length) {
                const data = {
                    isEmpty: true,
                    message: "No existe el producto seleccionado",
                    status: 500
                }
                return data
            } else {
                const doc = this.collection.doc(id);
                await doc.delete();
                console.log("El producto ha sido borrado con éxito");
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
            let id = uuidv4();
            const doc = this.collection.doc(id);
            doc.create({
                _id: id,
                timestamp: Date.now(),
                products: []
            });
            return id;
        } catch (error) {
            console.log('No es posible crear el carrito', error);
        }
    }

    async deleteCart(id) {
        try {
            const existCart = await this.getByID(id);
            if (!existCart) {
                const data = {
                    isEmpty: true,
                    message: `Carrito inexistente con el ID: ${id}`,
                    status: 500
                }
                return data
            } else {
                const doc = this.collection.doc(id);
                await doc.delete();
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
            console.log('el producto', product._id);
            const existCart = await this.getByID(id);
            if (!existCart.length) {
                const data = {
                    isEmpty: true,
                    message: `Carrito inexistente con el ID: ${id}`,
                    status: 500
                }
                return data;
            } else {
                let productsInCart = existCart[0].products;
                console.log('products in cart', productsInCart);
                let indexInCart = productsInCart.findIndex(el => el._id === product._id);
                //al parecer al iterar con findIndex y encontrar varios iguales te devuelve false
                console.log('index', indexInCart);
                if (indexInCart === -1) {
                    console.log('index -1')
                    console.log ('quepasaproducts0', productsInCart);
                    productsInCart.push({...product, quantity: 1});
                    console.log('products in cart 2', productsInCart);
                } else {
                    console.log('index ok')
                    productsInCart[indexInCart].quantity++
                }
                /* await cartByID[0].products.push(product); */
                const cartTemplate = await productsInCart;
                console.log('templateee', cartTemplate);
                this.collection.doc(id).set({ _id: id, timestamp: existCart[0].timestamp, products: productsInCart });
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

    //Modificar esta función para Firebase
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
            }
            let productsInCart = cartByID[0].products;
            const productToDelete = productsInCart.find(el => el._id === idProduct);
            console.log('finded: ', productToDelete);
            const indexCartProduct = productsInCart.findIndex(prod => prod._id === idProduct );
            console.log('index', indexCartProduct);
            if (indexCartProduct === -1) {
                const data = {
                    isEmpty: true,
                    message: `El producto no se encuentra en el carrito`,
                    status: 500
                };
                return data;
            } else {
                productsInCart = await productsInCart.filter( el => el._id !== idProduct);
                const cartTemplate = await productsInCart;
                this.collection.doc(id).set({ _id: id, timestamp: cartByID[0].timestamp, products: productsInCart });
                const data = {
                    cartTemplate,
                    isEmpty: !cartTemplate.length,
                    message: `No hay productos seleccionados`,
                    status: 200
                }
                return data;
            }
        } catch (error) {
            console.log('No se puede borrar el producto', error);
        }
    }
}

export default ContainerFirebase;