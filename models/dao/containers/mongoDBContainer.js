import { logger } from "../../../logs/logger.js";

class MongoDBContainer {
    constructor(collection) {
      this.collection = collection;
    }
  
    async create(data) {
      try {
        return await this.collection.create(data);
      } catch (err) {
        logger.error('No es posible crear la base de datos ', err);
      }
    }
  
    async getAll() {
      try {
        return await this.collection.find({});
      } catch (err) {
        logger.error('No es posible obtener la información de la base de datos ', err);
      }
    }
  
    async getByid(id) {
      try {
        return await this.collection.findById(id);
      } catch (err) {
        logger.error('No es posible obtener el elemento buscado de la base de datos ', err);
      }
    }
  
    async updateById(id, data) {
      try {
        return await this.collection.updateOne({ _id: id }, { $set: data });
      } catch (err) {
        logger.error('No es posible actualizar el elemento en la base de datos ', err);
      }
    }
  
    async deleteById(id) {
      try {
        return await this.collection.deleteOne({ _id: id });
      } catch (err) {
        logger.error('No es posible borrar el elemento de la base de datos ', err);
      }
    }
  }
  
  export default MongoDBContainer;