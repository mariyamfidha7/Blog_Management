import { Expose } from 'class-transformer';

export class BlogResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  tags: string[];

  @Expose()
  author: string;
}
