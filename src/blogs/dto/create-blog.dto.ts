import { IsNotEmpty, IsString } from 'class-validator';
import { ValidationMessages } from '../../config/messages/validation-messages';
export class CreateBlogDto {
  @IsString({ message: ValidationMessages.titleIsString })
  @IsNotEmpty({ message: ValidationMessages.titleNotEmpty })
  title: string;

  @IsNotEmpty({ message: ValidationMessages.descriptionNotEmpty })
  description: string;

  @IsString({ message: ValidationMessages.tagIsString })
  @IsNotEmpty({ message: ValidationMessages.tagNotEmpty })
  tags: string;
}
