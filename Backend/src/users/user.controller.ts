import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login-user.dto';
import { UserRepository } from './user.repository';

@Controller('user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() data: UserCreateDTO) {
    return this.userRepository.createUser(data);
  }

  @Post('/login')
  async login(@Body() body: LoginDTO) {
    this.userRepository.login(body);

    return {
      message: 'User logged in successfully!',
    };
  }
}
