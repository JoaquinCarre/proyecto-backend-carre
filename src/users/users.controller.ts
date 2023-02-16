import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        this.usersService.create(createUserDto)
    }

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.usersService.deleteOne(id);
    }
}
