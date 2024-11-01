import { IsInt, IsPositive, IsDecimal, IsOptional, IsIn } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  productName?: string; // Cambiado de productId a productName

  @IsOptional()
  userName?: string; // Cambiado de userId a userName

  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;

  @IsOptional()
  @IsDecimal()
  totalPrice?: number;

  @IsOptional()
  @IsIn(['pending', 'shipped', 'delivered'])
  status?: string;
}
