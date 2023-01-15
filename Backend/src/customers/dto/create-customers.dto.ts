import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';
import { CpfUnique } from '../validation/cpf-validation';
import { EmailUnique } from '../validation/email-validation';

export class CustomersCreateDTO {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty!' })
  name: string;

  @IsEmail(undefined, { message: 'The email entered is invalid!' })
  @EmailUnique({ message: 'A user with this email already exists!' })
  email: string;

  @IsString()
  @MinLength(8)
  phone: string;

  @IsString()
  address: string;

  @IsString()
  @MinLength(11)
  @CpfUnique({ message: 'cpf already existing or incorrect!' })
  cpf: string;
}
