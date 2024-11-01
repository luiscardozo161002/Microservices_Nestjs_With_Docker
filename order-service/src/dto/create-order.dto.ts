import { IsNotEmpty, IsInt, IsPositive, IsDecimal, IsOptional, IsIn } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  productName: string; // Cambiado de productId a productName

  @IsNotEmpty()
  userName: string; // Cambiado de userId a userName

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  quantity: number;

  @IsNotEmpty()
  @IsDecimal()
  totalPrice: number;

  @IsOptional()
  @IsIn(['pending', 'shipped', 'delivered'])
  status?: string;
}
