import mongoose, { Schema } from 'mongoose';
import config from '../config/mongoDB.js';

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//para conectar a mongoDB
mongoose.connect(config.mongoDB.URI, advancedOptions);

const cart = new Schema({
    timestamp: { type: Date, default: Date.now },
    products: [new Schema({
        title: { type: String, required: true },
        price: { type: Number },
        thumbnail: { type: String },
        quantity: { type: Number }
    })
    ]
})

export default mongoose.model('Cart', cart);