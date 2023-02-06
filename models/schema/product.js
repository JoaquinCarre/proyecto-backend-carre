import mongoose, { Schema } from 'mongoose';    

const product = new Schema({
    title: { type: String, required: true },
    price: { type: Number },
    thumbnail: { type: String }
})

export default mongoose.model('Product', product);