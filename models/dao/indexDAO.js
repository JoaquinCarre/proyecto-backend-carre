import mongoose from 'mongoose';
import config from '../../config/mongoDBConfig.js';
/* import ProductModel from '../schema/product.js';
import UserModel from '../schema/user.js';
import MongoDBContainer from './containers/mongoDBContainer.js';
import FileContainer from './containers/FileContainer.js'; */
import MessageDAO from './messageDAO.js';
import ProductDAO from './productDAO.js';
import UserDAO from './userDAO.js';

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(config.mongoDB.URI, advancedOptions);

/* const messageDB = new FileContainer(pathFile);
const productDB = new MongoDBContainer(ProductModel);
const userDB = new MongoDBContainer(UserModel);

export { messageDB, productDB, userDB }; */

const messageInstance = MessageDAO.getInstance();;
const productInstance = ProductDAO.getInstance();
const userInstance = UserDAO.getInstance();

export { messageInstance, productInstance, userInstance };