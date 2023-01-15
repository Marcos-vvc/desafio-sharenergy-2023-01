import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CustomersController } from './customers.controller';
import { CustomersRepository } from './customers.repository';
import { CpfValidator } from './validation/cpf-validation';
import { EmailValidator } from './validation/email-validation';

@Module({
  controllers: [CustomersController],
  providers: [CustomersRepository, PrismaService, EmailValidator, CpfValidator],
})
export class CustomersModule {}
