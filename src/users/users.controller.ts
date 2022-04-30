import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDTO) {
    const { email, password, name } = body;

    const user = await this.usersService.create(email, password, name);

    return user;
  }

  @Get('/users')
  async findAllUsers(@Query('email') email: string) {
    const users = await this.usersService.find(email);

    return users;
  }

  @Get('/users/:id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));

    return user;
  }
}
