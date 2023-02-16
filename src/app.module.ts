import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionModule } from 'nestjs-session';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { User, UserModel } from './users/schemas/user.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://sessions:${process.env.MONGO_PASS}@cluster0.bubyuyn.mongodb.net/sessions?retryWrites=true&w=majority`),
    ProductsModule,
    UsersModule,
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
    SessionModule.forRoot({ session: { secret: 'my-secret' } }),
    PassportModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, LocalStrategy, JwtStrategy],
})
export class AppModule { }
