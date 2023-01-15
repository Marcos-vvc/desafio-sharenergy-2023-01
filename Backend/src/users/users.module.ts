import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserRepository, PrismaService],
})
export class UsersModule {}
