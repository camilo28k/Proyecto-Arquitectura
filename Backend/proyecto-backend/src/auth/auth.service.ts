import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

async register(data: { name?: string; email: string; password: string }) {
  const email = data.email.trim().toLowerCase();
  const password = data.password.trim();

  const existingUser = await this.userService.findByEmail(email);

  if (existingUser) {
    throw new ConflictException('El correo ya está registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await this.userService.create({
    name: data.name?.trim(),
    email,
    password: hashedPassword,
  });

  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  return {
    message: 'Usuario registrado correctamente',
    access_token: this.jwtService.sign(payload),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

async login(email: string, password: string) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  const user = await this.userService.findByEmail(cleanEmail);

  if (!user) {
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  const validPassword = await bcrypt.compare(cleanPassword, user.password);

  if (!validPassword) {
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  return {
    message: 'Inicio de sesión correcto',
    access_token: this.jwtService.sign(payload),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
}