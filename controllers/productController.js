import ProductModel from '../models/product.js'

class ProductController {
  static create(data) {
    return ProductModel.create(data)
  }

  static get(query = {}) {
    return ProductModel.find(query)
  }

  static getByid(id) {
    return ProductModel.findById(id)
  }

  static uploadById(id, data) {
    return ProductModel.updateOne({ _id: id }, { $set: data })
  }

  static deleteById(id) {
    return ProductModel.deleteOne({ _id: id })
  }
}

export default ProductController