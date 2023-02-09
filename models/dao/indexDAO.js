
import MessageDAO from './messageDAO.js';
import ProductDAO from './productDAO.js';
import UserDAO from './userDAO.js';

const messageInstance = MessageDAO.getInstance();
const productInstance = ProductDAO.getInstance();
const userInstance = UserDAO.getInstance();

export { messageInstance, productInstance, userInstance };