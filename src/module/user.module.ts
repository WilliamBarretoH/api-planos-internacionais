import { Module } from '@nestjs/common';
import { UserService } from 'src/service/user.service';
import { UserController } from 'src/controller/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // se precisar usar no AuthModule
})
export class UserModule {}
