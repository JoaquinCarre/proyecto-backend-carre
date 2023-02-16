import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalService } from './local/local.service';
import { LocalStrategy } from './local.strategy';
import { JwtService } from './jwt/jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { UserModel, User } from 'src/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'my-secret',
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }])
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalService, LocalStrategy, JwtService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
