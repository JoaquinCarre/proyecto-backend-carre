import { Schema } from "mongoose";
import ContainerMongoDB from "../../containers/ContainerMongoDB.js";

class CartDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super('Cart', new Schema({
            timestamp: { type: Date, default: Date.now },
            products: [new Schema({
                _id: { type: Schema.Types.ObjectId, required: true },
                title: { type: String, required: true },
                description: { type: String, required: true },
                price: { type: Number, required: true },
                thumbnail: { type: String, required: true },
                stock: { type: Number, required: true },
                code: { type: String, required: true },
            })]


        }));
    };
};

export default CartDaoMongoDB;