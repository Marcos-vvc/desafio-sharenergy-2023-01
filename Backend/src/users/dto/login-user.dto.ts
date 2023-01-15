import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty!' })
  username: string;

  @MinLength(6)
  @IsNotEmpty({ message: 'Password cannot be empty!' })
  password: string;
}
