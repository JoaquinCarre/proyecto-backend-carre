import { Schema } from "mongoose";
import ContainerMongoDB from "../../containers/ContainerMongoDB.js";

class ProductsDaoMongoDB extends ContainerMongoDB {
    constructor(){
        super('Producto', new Schema({
            title: { type: String, required: true },
            description: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
            stock: { type: Number, required: true },
            code: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }));
    };
};

export default ProductsDaoMongoDB;