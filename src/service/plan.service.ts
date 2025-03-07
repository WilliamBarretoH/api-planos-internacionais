import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class PlanService {
  //private prisma = new PrismaClient(); 
  constructor(private readonly prisma: PrismaService) {}

  async createPlan(name: string, price: number, description?: string) {
    return this.prisma.plan.create({
      data: { name, price, description },
    });
  }

  async findAll() {
    return this.prisma.plan.findMany();
  }

  async findById(id: number) {
    const plan = await this.prisma.plan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException(`Plan ID ${id} not found`);
    return plan;
  }

  async deletePlan(id: number) {
    // Verifica se existe
    await this.findById(id);
    return this.prisma.plan.delete({ where: { id } });
  }
}
