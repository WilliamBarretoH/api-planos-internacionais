import { 
    Controller, Post, Get, Delete, Body, Param, ParseIntPipe, UseGuards, Req
  } from '@nestjs/common';
  import { SubscriptionService } from 'src/service/subscription.service';
  import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
  import { CreateSubscriptionDto } from 'src/dto/create-subscription.dto';
  
  @Controller('subscriptions')
  @UseGuards(JwtAuthGuard) // Todas as rotas exigem autenticação
  export class SubscriptionController {
    constructor(private subscriptionService: SubscriptionService) {}
  
    @Post()
    create(@Body() dto: CreateSubscriptionDto, @Req() req: any) {
      const userId = req.user.userId;
      return this.subscriptionService.createSubscription(userId, dto.planId);
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.subscriptionService.findById(id);
    }
  
    @Delete(':id')
    cancel(@Param('id', ParseIntPipe) id: number) {
      return this.subscriptionService.cancelSubscription(id);
    }
  }
  