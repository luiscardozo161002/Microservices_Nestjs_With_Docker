import { IsNotEmpty, IsString, IsNumber, IsPositive, Min, Max, Length } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(10, 255)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(50)
  stock: number;
}
