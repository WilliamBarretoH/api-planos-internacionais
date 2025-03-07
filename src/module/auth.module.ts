import { Module } from '@nestjs/common';
import { AuthService } from 'src/service/auth.service';
import { AuthController } from 'src/controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user.module';

import { JwtStrategy } from 'src/guards/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // Use a mesma chave que você definiu na jwt.strategy ou use process.env
      secret: process.env.JWT_SECRET || 'chave-super-secreta',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Adicione JwtStrategy aqui
  exports: [AuthService],
})
export class AuthModule {}
