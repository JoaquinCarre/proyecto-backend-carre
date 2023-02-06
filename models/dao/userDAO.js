import MongoDBContainer from './containers/mongoDBContainer.js';
import userModel from '../schema/user.js';

let userInstance = null;

export default class UserDAO extends MongoDBContainer {
    constructor(model) {
        super(model);
    }

    static getInstance() {
        if (!userInstance) {
            userInstance = new UserDAO(userModel);
        }
        return userInstance
    }
}