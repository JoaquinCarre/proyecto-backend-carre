import CartModel from '../models/cart.js'

class CartController {
  static create(data) {
    return CartModel.create(data)
  }

  static get(query = {}) {
    return CartModel.find(query)
  }

  static getByid(id) {
    return CartModel.findById(id)
  }

  static uploadById(id, data) {
    return CartModel.findOneAndUpdate({ _id: id }, { $push: { products: data }});
  }

  static uploadQuantity(id, data) {
    return CartModel.findOneAndUpdate({ _id: id, "products._id": data._id}, { $inc: { "products.$.quantity": 1 }});
  }

  static deleteItemById (id, product_id) {
    return CartModel.updateOne({ _id: id }, { $pull: { products: { _id: product_id } } });  
  }

  static deleteCartById(id) {
    return CartModel.deleteOne({ _id: id })
  }
}

export default CartController;