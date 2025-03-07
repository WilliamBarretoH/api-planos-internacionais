import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;
}
