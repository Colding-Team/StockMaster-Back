import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.user(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const paylod = { sub: user.id, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(paylod),
    };
  }
}
