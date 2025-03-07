import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'; // Vamos instanciar diretamente ou via PrismaService
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private prisma = new PrismaClient(); 
  // (Opcional) Podemos criar um PrismaService centralizado ao invés de instanciar direto.

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
