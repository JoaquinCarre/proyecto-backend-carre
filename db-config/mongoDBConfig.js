//Agregado para el desafío 14: uso de dotenv
import 'dotenv/config.js';

export default {
    mongoDB: {
        URI: `mongodb+srv://sessions:${process.env.MONGO_PASS}@cluster0.bubyuyn.mongodb.net/sessions?retryWrites=true&w=majority`
    },
}