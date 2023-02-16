import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-users.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async create(createUserDto: CreateUserDto) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
        try {
            const createdUser = await this.userModel.create({ ...createUserDto, password: hashedPassword });
            return createdUser;
        } catch (error) {
            console.log('No se puede añadir el usuario', error);
        }
    }

    async findAll() {
        try {
            return this.userModel.find().exec();
        } catch (error) {
            console.log('No se pueden encontrar productos', error);
        }
    }

    async findOne(id: string) {
        try {
            return this.userModel.findOne({ _id: id }).exec();
        } catch (error) {
            console.log('No se puede encontrar el producto', error);
        }
    }

    async deleteOne(id: string) {
        const deletedProduct = await this.userModel.findByIdAndRemove({_id:id}).exec();
        return deletedProduct;
    }
}
