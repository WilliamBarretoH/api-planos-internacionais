import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async createUser(
        email: string,
        password: string,
        name?: string,
        role: string = 'user', // Padrão é 'user'
    ) {
        const hashedPassword = await bcrypt.hash(password, 10);

        return this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role,
            },
        });
    }


    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
}
