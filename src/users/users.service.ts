import { ConflictException, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {   }
  
  async create(userDetails: CreateUserParams) {
    if (
      (await this.userRepository.findOneBy({ username: userDetails.username }))
    ) {
      return new ConflictException('User already exist.');
    }

    const newUser = this.userRepository.create({ ...userDetails });
    try {
      const { id, password, ...result } = await this.userRepository.save(newUser);
      return {
        message: 'New user created.',
        data: result
      };
    } catch (err: any){
      return new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: ['profile'],
    });
  }

  findOneByUser(username: string) {
    return this.userRepository.findOne({
      where: {
        username: username,
      }
    });
  }

  async updateUser(id: number, userDetails: UpdateUserParams) {
    const updatedUser = await this.userRepository.update({ id }, { ...userDetails });
    return updatedUser;
  }

  removeUser(id: number) {
    return this.userRepository.delete({ id });
  }
}
