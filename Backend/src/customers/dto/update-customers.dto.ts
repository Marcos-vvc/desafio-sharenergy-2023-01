import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { CpfUnique } from '../validation/cpf-validation';
import { EmailUnique } from '../validation/email-validation';

export class UpdateCustomersDTO {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty!' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'The email entered is invalid!' })
  @EmailUnique({ message: 'A user with this email already exists!' })
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @CpfUnique({ message: 'cpf already existing or incorrect!' })
  @IsOptional()
  cpf: string;
}
