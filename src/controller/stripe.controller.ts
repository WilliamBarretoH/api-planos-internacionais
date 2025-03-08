import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { StripeService } from '../service/stripe.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  //acredito que nao consegui concluir com exito essa parte de criar o pagamento pois
  //nao identifiquei a maneira correta de fazer para tranferencia bancaria
  @Post()
  async createPaymentIntent(@Body() body: { amount: number; currency: string }) {
    const { amount, currency } = body;
    return this.stripeService.createPaymentIntent(amount, currency);
  }

  @Get(':id')
  async getPaymentIntentById(@Param('id') id: string) {
    return this.stripeService.capturePaymentIntent(id);
  }

}