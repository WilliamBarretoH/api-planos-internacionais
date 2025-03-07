import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async createSubscription(userId: number, planId: number) {
    // Verificar se o plano existe
    const plan = await this.prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) throw new NotFoundException('Plano não encontrado');

    // Verificar se o usuário já tem uma assinatura ativa
    const existingSubscription = await this.prisma.subscription.findFirst({
      where: { userId, planId, status: 'ACTIVE' },
    });

    if (existingSubscription) {
      throw new BadRequestException('Usuário já tem uma assinatura ativa para este plano');
    }

    // Criar assinatura
    return this.prisma.subscription.create({
      data: {
        userId,
        planId,
        status: 'ACTIVE',
      },
      include: { plan: true },
    });
  }

  async findById(id: number) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id },
      include: { plan: true, user: true },
    });

    if (!subscription) {
      throw new NotFoundException(`Assinatura ID ${id} não encontrada`);
    }

    const response = {
      subscription: {
        status: subscription.status,
        createdAt: subscription.createdAt,
        updatedAt: subscription.updatedAt,
        plan: {
          name: subscription.plan.name,
          price: subscription.plan.price
        },
        user: {
          email: subscription.user.email
        }

      } 
    }

    return response;
  }

  async cancelSubscription(id: number) {
    // Verificar se a assinatura existe
    const subscription = await this.findById(id);

    if (subscription.subscription.status === 'CANCELED') {
      throw new BadRequestException('Assinatura já está cancelada');
    }

    // Atualizar status para "CANCELED"
    return this.prisma.subscription.update({
      where: { id },
      data: { status: 'CANCELED' },
    });
  }
}
