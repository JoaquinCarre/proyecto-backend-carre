import { productInstance } from "../dao/indexDAO.js";
import ProductDTO from "../dto/productDTO.js";

export default class ProductRepository {
  constructor() {
    this.dao = productInstance;
  }

  async getAll() {
    const data = await this.dao.getAll();
    if (data) {
      const dataDTO = data.map((prod) => new ProductDTO(prod));
      return dataDTO;
    } else {
      return null;
    }
  }

  async getProdByid(id) {
    const data = await this.dao.getOneById(id);
    if (data) {
      return new ProductDTO(data);
    } else {
      return null;
    }
  }

  async create(data) {
    const response = await this.dao.create(data);
    return new ProductDTO(response);
  }

  async update(id, data) {
    return await this.dao.updateById(id, data);
  }

  async delete(id) {
    return await this.dao.deleteById(id);
  }
}
