import mongoose, { Schema } from 'mongoose';
import config from '../config/mongoDBConfig.js';

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//para conectar a mongoDB
mongoose.connect(config.mongoDB.URI, advancedOptions);

const product = new Schema({
    title: { type: String, required: true },
    price: { type: Number },
    thumbnail: { type: String }
})

export default mongoose.model('Product', product);