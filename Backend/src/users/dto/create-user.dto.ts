import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserCreateDTO {
  @IsString()
  username: string;

  @IsEmail(undefined, { message: 'The email entered is invalid!' })
  email: string;

  @MinLength(6)
  password: string;
}
