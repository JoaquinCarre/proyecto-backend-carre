import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/dto/create-products.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) { }

    async create(createProductDto: CreateProductDto) {
        try {
            const createdProduct = await this.productModel.create(createProductDto);
            return createdProduct;
        } catch (error) {
            console.log('No se puede añadir el producto', error);
        }
    }

    async findAll() {
        try {
            return this.productModel.find().exec();
        } catch (error) {
            console.log('No se pueden encontrar productos', error);
        }
    }

    async findOne(id: string) {
        try {
            return this.productModel.findOne({ _id: id }).exec();
        } catch (error) {
            console.log('No se puede encontrar el producto', error);
        }
    }

    async deleteOne(id: string) {
        const deletedProduct = await this.productModel.findByIdAndRemove({_id:id}).exec();
        return deletedProduct;
    }
}
