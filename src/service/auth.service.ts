import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginDto } from 'src/dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async register(dto: CreateUserDto) {
        // Verifica se email já existe
        const userExists = await this.userService.findByEmail(dto.email);
        if (userExists) {
            throw new BadRequestException('Email already in use');
        }
        // Cria usuário
        const user = await this.userService.createUser(dto.email, dto.password, dto.name);
        const payload = { sub: user.id, email: user.email }
        // Retorna token gerado e email
        const data = {
            user: user.email,
            token: this.jwtService.sign(payload)
        }
        return { message: 'User created successfully', data };
    }

    async login(loginDto: LoginDto) {
        const user = await this.userService.findByEmail(loginDto.email);
        if (!user) throw new BadRequestException('Invalid credentials');

        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) throw new BadRequestException('Invalid credentials');

        const payload = { sub: user.id, email: user.email, role: user.role };

        const token = this.jwtService.sign(payload);
        return { token };
    }

}
