import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserValidationMessages } from '../../validations/validation-messages';

export class CreateUserDto {
  @IsString({ message: UserValidationMessages.nameIsString })
  @IsNotEmpty({ message: UserValidationMessages.nameNotEmpty })
  @MaxLength(30, { message: UserValidationMessages.nameMaxLength })
  name: string;

  @IsNotEmpty({ message: UserValidationMessages.usernameNotEmpty })
  @IsString({ message: UserValidationMessages.usernameIsString })
  @MinLength(3, { message: UserValidationMessages.usernameMinLength })
  @MaxLength(15, { message: UserValidationMessages.usernameMaxLength })
  username: string;

  @IsEmail({}, { message: UserValidationMessages.emailInvalidFormat })
  @IsNotEmpty({ message: UserValidationMessages.emailNotEmpty })
  @MaxLength(40, { message: UserValidationMessages.emailMaxLength })
  email: string;

  @IsInt({ message: UserValidationMessages.ageIsInt })
  age: number;

  @IsEnum(['f', 'm', 'u'], { message: UserValidationMessages.genderEnum })
  gender: string;

  @IsNotEmpty({ message: UserValidationMessages.passwordNotEmpty })
  password: string;

  readonly blogs: number[];
}
