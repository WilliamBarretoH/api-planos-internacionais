import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user.module';
import { AuthModule } from './module/auth.module';
import { PlanModule } from './module/plan.module';
import { SubscriptionModule } from './module/subscription.module';
import { StripeModule } from './module/stripe.module';


@Module({
  imports: [UserModule, AuthModule, PlanModule, SubscriptionModule, StripeModule.forRootAsync()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
