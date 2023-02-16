import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare } from 'bcryptjs';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();
    console.log('contraseña usuario', user.password)
    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }
}