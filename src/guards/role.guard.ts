import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Busca roles definidas no metadado (pode estar no método ou no controller)
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Se nenhuma role foi exigida, a rota é pública ou não tem restrição de role
    if (!requiredRoles) {
      return true;
    }

    // Pega o usuário do request, que foi definido pelo JWT Guard
    const { user } = context.switchToHttp().getRequest();

    // Se o usuário tiver alguma das roles requeridas, retornamos true
    return requiredRoles.includes(user.role);
  }
}
