import { UnauthorizedException } from '@nestjs/common';

export function extractToken(headers: any): string {
  console.log(headers);
  const authHeader = headers.authorization;
  if (!authHeader) {
    throw new UnauthorizedException('Authorization header missing');
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new UnauthorizedException('Token not found in authorization header');
  }
  return token;
}
