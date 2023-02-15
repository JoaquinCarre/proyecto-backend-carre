import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose'

export type ProductDocument = HydratedDocument<Product>

@Schema()
export class Product {
    @Prop({ required: true, unique: true })
    title: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    thumbnail: string;
}

export const ProductModel = SchemaFactory.createForClass(Product)