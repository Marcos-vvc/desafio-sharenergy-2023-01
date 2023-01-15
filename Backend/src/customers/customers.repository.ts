import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/database/PrismaService';
import { CustomersCreateDTO } from './dto/create-customers.dto';
import { CustomersEntity } from './customers.entity';

@Injectable()
export class CustomersRepository {
  constructor(private prisma: PrismaService) {}

  async createCustomers(data: CustomersCreateDTO) {
    const user = await this.prisma.customers.create({
      data,
    });

    return user;
  }

  async searchCustomers() {
    const search = await this.prisma.customers.findMany();

    return search;
  }

  async searchEmail(email: string) {
    return this.prisma.customers.findUnique({
      where: { email },
    });
  }

  async searchCpf(cpf: string) {
    return this.prisma.customers.findUnique({
      where: { cpf },
    });
  }

  async updateCustomers(id: string, data: Partial<CustomersEntity>) {
    const upadate = await this.prisma.customers.findUnique({
      where: { id },
    });

    if (!upadate) {
      throw new Error('User does not exists!');
    }

    return await this.prisma.customers.update({
      data,
      where: { id },
    });
  }

  async deleteCustomers(id: string) {
    const deleteUser = await this.prisma.customers.findUnique({
      where: { id },
    });

    if (!deleteUser) {
      throw new NotFoundException(`User ${id} does not exists`);
    }

    return await this.prisma.customers.delete({
      where: { id },
    });
  }
}
