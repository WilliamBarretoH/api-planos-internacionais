import { Module } from '@nestjs/common';
import { UserService } from 'src/service/user.service';
import { UserController } from 'src/controller/user.controller';
import { PrismaService } from 'src/service/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService], // se precisar usar no AuthModule
})
export class UserModule {}
