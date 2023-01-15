import { Body, Controller, Get, Post } from '@nestjs/common';
import { Delete, Param, Put } from '@nestjs/common/decorators';
import { CustomersCreateDTO } from './dto/create-customers.dto';
import { UpdateCustomersDTO } from './dto/update-customers.dto';
import { CustomersRepository } from './customers.repository';

@Controller('customers')
export class CustomersController {
  constructor(private usersRepository: CustomersRepository) {}

  @Post()
  async createCustomers(@Body() data: CustomersCreateDTO) {
    return this.usersRepository.createCustomers(data);
  }

  @Get()
  async searchCustomers() {
    return this.usersRepository.searchCustomers();
  }

  @Put(':id')
  async updateCustomers(@Param('id') id: string, @Body() data: UpdateCustomersDTO) {
    return this.usersRepository.updateCustomers(id, data);
  }

  @Delete(':id')
  async deleteCustomers(@Param('id') id: string) {
    const userDelete = await this.usersRepository.deleteCustomers(id);

    return {
      user: userDelete,
      message: 'User removed successfully',
    };
  }

}
