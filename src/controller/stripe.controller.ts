import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StripeService } from '../service/stripe.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('stripe')
@UseGuards(JwtAuthGuard)
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: { amount: number; currency: string }) {
    const { amount, currency } = body;
    return this.stripeService.createPaymentIntent(amount, currency);
  }

}