import { Inject, Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);

  constructor(
    @Inject('STRIPE_API_KEY')
    private readonly apiKey: string,
  ) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: "2025-02-24.acacia", // Use latest API version, or "null" for your default
    });
  }

  // Accept Payments (Create Payment Intent)
  async createPaymentIntent(
    amount: number,
    currency: string,
  ): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
      });
      this.logger.log(
        `PaymentIntent created successfully with amount: ${amount} ${currency}`,
      );
      return paymentIntent;
    } catch (error) {
      this.logger.error('Failed to create PaymentIntent', error.stack);
      throw error;
    }
  }

  // Customer Management (Create Customer)
  async createCustomer(email: string, name: string): Promise<Stripe.Customer> {
    try {
      const customer = await this.stripe.customers.create({ email, name });
      this.logger.log(`Customer created successfully with email: ${email}`);
      return customer;
    } catch (error) {
      this.logger.error('Failed to create customer', error.stack);
      throw error;
    }
  }

  // Product & Pricing Management (Create Product with Price)
  async createProduct(
    name: string,
    description: string,
    price: number,
  ): Promise<Stripe.Product> {
    try {
      const product = await this.stripe.products.create({ name, description });
      await this.stripe.prices.create({
        product: product.id,
        unit_amount: price * 100, // amount in cents
        currency: 'usd',
      });
      this.logger.log(`Product created successfully: ${name}`);
      return product;
    } catch (error) {
      this.logger.error('Failed to create product', error.stack);
      throw error;
    }
  }

  // Reports and Analytics (Retrieve Balance)
  async getBalance(): Promise<Stripe.Balance> {
    try {
      const balance = await this.stripe.balance.retrieve();
      this.logger.log('Balance retrieved successfully');
      return balance;
    } catch (error) {
      this.logger.error('Failed to retrieve balance', error.stack);
      throw error;
    }
  }

  // Payment Links
  async createPaymentLink(priceId: string): Promise<Stripe.PaymentLink> {
    try {
      const paymentLink = await this.stripe.paymentLinks.create({
        line_items: [{ price: priceId, quantity: 1 }],
      });
      this.logger.log('Payment link created successfully');
      return paymentLink;
    } catch (error) {
      this.logger.error('Failed to create payment link', error.stack);
      throw error;
    }
  }
}