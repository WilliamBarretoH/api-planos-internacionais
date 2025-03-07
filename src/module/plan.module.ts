import { Module } from '@nestjs/common';
import { PlanController } from 'src/controller/plan.controller';
import { PlanService } from 'src/service/plan.service';
// Se você usa PrismaService centralizado, importe aqui também
import { PrismaService } from 'src/service/prisma.service';

@Module({
  controllers: [PlanController],
  providers: [PlanService, PrismaService],
  exports: [PlanService],
})
export class PlanModule {}
