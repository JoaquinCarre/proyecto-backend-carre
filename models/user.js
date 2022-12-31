import mongoose, { Schema } from 'mongoose';
import config from '../db-config/mongoDBConfig.js';

//para conectar a mongoDB
await mongoose.connect(config.mongoDB.URI);

const user = new Schema({
    email: { type: String, require: true, unique: true, index: true, validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ },
    password: { type: String, require: true },
}, { timestamps: true })

export default mongoose.model('User', user);