import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '../auth/jwt/jwt.service';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Authenticate user based on provided credentials.
   *
   * @param {string} email - User's email.
   * @param {string} pass - User's password.
   * @returns {Promise<{ access_token: string }>} - JWT token for authenticated user.
   */
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const passwordMatch = await compare(pass, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }

  /**
   * Decode authentication token.
   *
   * @param {string} token - Authentication token.
   * @returns {Promise<any>} - Decoded token.
   */
  async decodeToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
