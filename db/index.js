import mongoose from 'mongoose';
import config from '../config/mongoDBConfig.js';
import ProductModel from '../models/product.js';
import UserModel from '../models/user.js';
import MongoDBContainer from './mongoDB.js';
import FileContainer from './File.js';
import path from 'path';
import { __dirname } from '../app.js';

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(config.mongoDB.URI, advancedOptions);

const messageDB = new FileContainer(path.join(__dirname, '/db/messages.json'));
const productDB = new MongoDBContainer(ProductModel);
const userDB = new MongoDBContainer(UserModel);

export { messageDB, productDB, userDB };