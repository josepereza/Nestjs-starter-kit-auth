import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Query, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('get-all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('get-by-id')
  findOne(@Query('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('update')
  update(@Query('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete('delete')
  remove(@Query('id') id: string) {
    return this.usersService.removeUser(+id);
  }
}
