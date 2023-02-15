import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductModel, Product } from './schemas/product.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductModel }])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
