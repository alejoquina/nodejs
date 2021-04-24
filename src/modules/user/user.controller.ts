import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    //inyecion de dependencia
    constructor(private readonly _userService: UserService){
        //constrcutor
    }

    @Get(':id')
    async getUser(@Param() id: number):Promise<UserDto>{
        const user = await  this._userService.get(id);
        return user;
    }

    @Get()
    async getUsers():Promise<UserDto[]>{
        const users = await  this._userService.getAll();
        return users;

    }

    @Post('create')
    async createUser(@Body() user: User): Promise<UserDto>{
        const createUser = await this._userService.create(user);
        return createUser;
    }

    @Patch(':id')
    async updateUser(@Param() id: number, @Body() user: User){
        const updateUser = await this._userService.update(id,user);
        return true;
    }

    @Delete(':id')
    async deleteUser(@Param() id: number){
        await  this._userService.delete(id);
        return true;
    }



}
