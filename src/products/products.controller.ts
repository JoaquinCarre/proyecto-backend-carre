import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        this.productsService.create(createProductDto)
    }

    @Get()
    async findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.productsService.deleteOne(id);
    }

    
}
