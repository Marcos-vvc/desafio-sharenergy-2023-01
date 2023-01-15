import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CustomersRepository } from '../customers.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class CpfValidator implements ValidatorConstraintInterface {
  constructor(private usersRepository: CustomersRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const userCpfExists = await this.usersRepository.searchCpf(value);

    return !userCpfExists;
  }
}

export const CpfUnique = (optionsValidation: ValidationOptions) => {
  return (object: Object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: optionsValidation,
      constraints: [],
      validator: CpfValidator,
    });
  };
};
