import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';

dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://sessions:${process.env.MONGO_PASS}@cluster0.bubyuyn.mongodb.net/sessions?retryWrites=true&w=majority`),
    ProductsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
