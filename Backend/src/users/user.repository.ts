import { PrismaService } from 'src/database/PrismaService';
import { UserCreateDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/login-user.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(dataDto: UserCreateDTO) {
    const passwordHash = await bcrypt.hash(dataDto.password, 10);

    const data = {
      ...dataDto,
      password: passwordHash,
    };

    const userCreated = await this.prisma.users.create({ data });
    return {
      ...userCreated,
      password: undefined,
    };
  }

  async login(dataDto: LoginDTO) {
    const user = await this.prisma.users.findFirst({
      where: {
        username: dataDto.username,
      },
    });

    if (user) {
      const validationPassword = await bcrypt.compare(
        dataDto.password,
        user.password,
      );

      return validationPassword;
    }

    return false;
  }
}
