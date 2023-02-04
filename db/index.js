import mongoose from 'mongoose';
import config from '../config/mongoDBConfig.js';
import ProductModel from '../models/product.js';
import UserModel from '../models/user.js';
import MongoDBContainer from './mongoDB.js';
import FileContainer from './File.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathFile = path.join(__dirname, '/messages.json');

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(config.mongoDB.URI, advancedOptions);

const messageDB = new FileContainer(pathFile);
const productDB = new MongoDBContainer(ProductModel);
const userDB = new MongoDBContainer(UserModel);

export { messageDB, productDB, userDB };