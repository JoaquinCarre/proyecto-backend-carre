import mongoose, { Schema } from 'mongoose';
import config from '../config/mongoDB.js';

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//para conectar a mongoDB
mongoose.connect(config.mongoDB.URI, advancedOptions);

const user = new Schema({
    email: { type: String, require: true, unique: true, index: true, validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ },
    password: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    name: { type: String, required: true },
    age: { type: Number },
    address: { type: String },
    phone: { type: String },
    avatar: { type: String }
})

export default mongoose.model('User', user);