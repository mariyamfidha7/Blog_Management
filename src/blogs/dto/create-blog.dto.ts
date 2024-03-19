import { IsNotEmpty, IsString } from 'class-validator';
import { BlogValidationMessages } from '../../validations/validation-messages';
export class CreateBlogDto {
  @IsString({ message: BlogValidationMessages.titleIsString })
  @IsNotEmpty({ message: BlogValidationMessages.titleNotEmpty })
  title: string;

  @IsNotEmpty({ message: BlogValidationMessages.descriptionNotEmpty })
  description: string;

  @IsString({ message: BlogValidationMessages.tagIsString })
  @IsNotEmpty({ message: BlogValidationMessages.tagNotEmpty })
  tags: string;
}
