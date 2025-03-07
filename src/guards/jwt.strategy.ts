import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // de onde extrair o token (Bearer token no header "Authorization")
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // A mesma chave usada para assinar o token no seu AuthModule
      // Em produção, use variável de ambiente:
      secretOrKey: process.env.JWT_SECRET || 'chave-super-secreta',
    });
  }

  // Se o token for válido, este método é chamado e podemos retornar
  // dados do payload para ficar disponível em req.user
  async validate(payload: any) {
    // O payload normalmente é algo que você definiu no momento de assinar, ex:
    // { sub: user.id, email: user.email, role: user.role }
    return { 
      userId: payload.sub, 
      email: payload.email, 
      role: payload.role 
    };
  }
}
