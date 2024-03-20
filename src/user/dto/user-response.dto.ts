import { Exclude, Expose } from 'class-transformer';

export class UsersResponseDto {
  @Exclude()
  id: string;

  @Expose()
  name: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  age: number;

  @Exclude()
  password: string;

  @Expose()
  gender: string;
}
