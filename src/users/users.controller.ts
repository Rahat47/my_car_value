import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Query,
  Param,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

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

  @UseInterceptors(SerializeInterceptor)
  @Get('/users/:id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Delete('/users/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.remove(parseInt(id));

    return user;
  }

  @Patch('/users/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    const user = await this.usersService.update(parseInt(id), body);

    return user;
  }
}
