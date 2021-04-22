import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NOTFOUND } from 'node:dns';
import { MapperService } from 'src/shared/mapper.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        private readonly _mapperservice: MapperService
    ){}

    //metodo get parametro id promesa de userdto
    async get(id: number): Promise<UserDto>{
        if(!id){
            throw new BadRequestException('id no existe');
        }
        //si existe vamos user repository con el metodo findOne(solo uno) lo traemos por id con la condicion que e activo
        const user: User = await this._userRepository.findOne(id,{where: {status: "ACTIVE"}});

        if(!user){
            throw new NotFoundException();
        }
        //si existe devuelve entiti user y userdto con parametros de ususario y nuevo dto
        return this._mapperservice.map<User,UserDto>(user, new UserDto());

    }

    //metodo
    async getAll(): Promise<UserDto[]>{
       

        const users: User[] = await this._userRepository.find({where: {status: "ACTIVE"}});

        //si existe devuelve entiti user y userdto con parametros de ususario y nuevo dto
        return this._mapperservice.mapCollection<User,UserDto>(users, new UserDto());

    }

    async create(user:User): Promise<UserDto>{
        const savedUser: User = await this._userRepository.save(user);
        return this._mapperservice.map<User,UserDto>(savedUser, new UserDto());
    }


    async update(id:number,user:User):Promise<void>{
       
         await this._userRepository.update(id,user);
         
    }

    async delete(id:number):Promise<void>{
       
        const userExist = await this._userRepository.findOne(id,{where: {status: "ACTIVE"}});

        if(!userExist){
            throw new NotFoundException();            
        }

        await this._userRepository.update(id,{status: "INACTIVE"});
        
   }







}
