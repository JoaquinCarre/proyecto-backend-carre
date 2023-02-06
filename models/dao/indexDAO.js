import mongoose from 'mongoose';
import config from '../../config/mongoDBConfig.js';
import MessageDAO from './messageDAO.js';
import ProductDAO from './productDAO.js';
import UserDAO from './userDAO.js';

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(config.mongoDB.URI, advancedOptions);

const messageInstance = MessageDAO.getInstance();
const productInstance = ProductDAO.getInstance();
const userInstance = UserDAO.getInstance();

export { messageInstance, productInstance, userInstance };