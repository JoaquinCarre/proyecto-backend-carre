import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const cert = JSON.parse(await readFile(
    new URL('./backend-coderhouse-9b915-firebase-adminsdk-ab3n2-33d0a55edb.json', import.meta.url)
))

admin.initializeApp({credential: admin.credential.cert(cert)});
console.log ('Base Firebase Conectada!');

const db = admin.firestore();

class ContainerFirebase {
    constructor(collection) {
        this.collection = db.collection(collection);
    }

    async getAll() {
        try {
            const querySnapshot = await this.collection.get();
            const products = querySnapshot.docs.map((doc)=>({_id: doc.id.toString(), ...doc.data()}));
            return products;
        } catch (error) {
            console.log('No es posible obtener los productos de la base de datos', error);
        }
    }

    async getByID(id) {
        try {
            const doc = this.collection.doc(id);
            const item = await doc.get();
            const response = item.data();
            console.log ('Producto obtenido por id: ', response);
            return response;
        } catch (error) {
            console.log('No se puede obtener el producto solicitado', error);
        }
    }

    async addProduct(product) {
        try {
            const { title, description, price, thumbnail, stock } = product
            if (title && description && price && thumbnail && stock) {
                let id = uuidv4();
                const doc = this.collection.doc(id);
                await doc.create(product);
                console.log ('Producto añadido');
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
                console.log ("El producto ha sido borrado con éxito");
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

    
}

export default ContainerFirebase;