class Controller {
  constructor(collection) {
    this.collection = collection;
  }

  static create(data) {
    return this.collection.create(data);
  }

  static get(query = {}) {
    return this.collection.find(query);
  }

  static getByid(id) {
    return this.collection.findById(id);
  }

  static uploadById(id, data) {
    return this.collection.updateOne({ _id: id }, { $set: data });
  }

  static deleteById(id) {
    return this.collection.deleteOne({ _id: id });
  }
}

export default Controller;

//Unificar luego todos los controller en este y que se apliquen poniendo:
//import Controller from './controller/controller.js';
//import UserModel from './models/user.js'; --> y así con el resto.
//const users = new Controller(UserModel); --> y así con el resto.