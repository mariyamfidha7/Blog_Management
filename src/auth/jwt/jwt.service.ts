import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  async sign(payload: any): Promise<string> {
    return this.nestJwtService.signAsync(payload);
  }

  async verify(token: string): Promise<any> {
    return this.nestJwtService.verifyAsync(token);
  }
}
