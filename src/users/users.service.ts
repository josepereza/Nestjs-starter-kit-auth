import { ConflictException, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async create(userDetails: CreateUserParams) {
    if (
      (await this.userRepository.findOneBy({ username: userDetails.username }))
    ) {
      return new ConflictException('User already exist.');
    }

    if (
      (await this.userRepository.findOneBy({ email: userDetails.email }))
    ) {
      return new ConflictException('Email already exist.');
    }

    const salt = await bcrypt.genSalt();

    const newUser = this.userRepository.create({ ...userDetails });
    newUser.password = await bcrypt.hash(userDetails.password, salt);

    try {

      const { id, password, ...result } = await this.userRepository.save(newUser);
      return {
        message: 'New user created.',
        data: result
      };
    } catch (err: any) {
      return new HttpException(err, HttpStatus.BAD_REQUEST);
    }

  }

  findAll() {
    return this.userRepository
      .createQueryBuilder('u')
      .select(['u.name', 'u.username', 'u.email', 'u.roles'])
      .getMany();
  }

  findOne(id: number) {
    return this.userRepository.createQueryBuilder('u')
      .where('u.id = :id', { id: id })
      .select(['u.name', 'u.username', 'u.email', 'u.roles'])
      .getOne();
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email })

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
