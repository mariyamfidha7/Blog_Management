import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ValidationMessages } from '../../config/messages/validation-messages';

export class CreateUserDto {
  @IsString({ message: ValidationMessages.nameIsString })
  @IsNotEmpty({ message: ValidationMessages.nameNotEmpty })
  @MaxLength(30, { message: ValidationMessages.nameMaxLength })
  name: string;

  @IsNotEmpty({ message: ValidationMessages.usernameNotEmpty })
  @IsString({ message: ValidationMessages.usernameIsString })
  @MinLength(3, { message: ValidationMessages.usernameMinLength })
  @MaxLength(15, { message: ValidationMessages.usernameMaxLength })
  username: string;

  @IsEmail({}, { message: ValidationMessages.emailInvalidFormat })
  @IsNotEmpty({ message: ValidationMessages.emailNotEmpty })
  @MaxLength(40, { message: ValidationMessages.emailMaxLength })
  email: string;

  @IsInt({ message: ValidationMessages.ageIsInt })
  age: number;

  @IsEnum(['f', 'm', 'u'], { message: ValidationMessages.genderEnum })
  gender: string;

  @IsNotEmpty({ message: ValidationMessages.passwordNotEmpty })
  password: string;

  readonly blogs: number[];
}
