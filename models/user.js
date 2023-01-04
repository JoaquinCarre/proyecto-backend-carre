import mongoose, { Schema } from 'mongoose';
import config from '../db-config/mongoDBConfig.js';

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//para conectar a mongoDB
mongoose.connect(config.mongoDB.URI, advancedOptions);

const user = new Schema({
    email: { type: String, require: true, unique: true, index: true, validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ },
    password: { type: String, require: true },
}, { timestamps: true })

export default mongoose.model('User', user);