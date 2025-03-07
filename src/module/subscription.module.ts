import { Module } from '@nestjs/common';
import { SubscriptionController } from 'src/controller/subscription.controller';
import { SubscriptionService } from 'src/service/subscription.service';
import { PrismaService } from 'src/service/prisma.service';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, PrismaService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
