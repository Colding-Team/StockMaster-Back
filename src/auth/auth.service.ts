import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/auth.singUpDto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ access_token: string }> {
    const { name, email, password } = signUpDto;

    const existingUser = await this.userService.user(email);

    if (existingUser) {
      throw new BadRequestException('Este email já está em uso!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userService.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const payload = { name: name, email: email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.user(email);
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos!');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos!');
    }

    const paylod = { name: user.name, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(paylod),
    };
  }
}
