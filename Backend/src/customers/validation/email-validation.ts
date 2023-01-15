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
export class EmailValidator implements ValidatorConstraintInterface {
  constructor(private usersRepository: CustomersRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const userEmailExists = await this.usersRepository.searchEmail(value);

    return !userEmailExists;
  }
}

export const EmailUnique = (optionsValidation: ValidationOptions) => {
  return (object: Object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: optionsValidation,
      constraints: [],
      validator: EmailValidator,
    });
  };
};
