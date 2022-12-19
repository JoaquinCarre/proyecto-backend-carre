import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const cert = JSON.parse(await readFile(
    new URL('./db-config/backend-normalizr-firebase-adminsdk-h15n6-9b290a860c.json', import.meta.url)
))

admin.initializeApp({ credential: admin.credential.cert(cert) });
console.log('Base Firebase Conectada!');

const db = admin.firestore();

class ContenedorArchivos {
    constructor() {
        this.collection = db.collection('messages');
    }

    async getMessage () {
        /* const listMessages = await readFile('./public/messages.json', 'utf-8');
        return listMessages; */
        try {
            const querySnapshot = await this.collection.get();
            const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            return products;
        } catch (error) {
            console.log('No es posible obtener los mensajes de la base de datos', error);
        }
    }
}

export default ContenedorArchivos;