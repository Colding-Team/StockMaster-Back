import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  productId: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsInt()
  typeId?: number;

  @IsInt()
  cost: number;

  @IsInt()
  price: number;

  @IsInt()
  weight: number;

  @IsOptional()
  @IsString()
  imgUrl?: string;

  @IsOptional()
  @IsString()
  batch?: string;

  @IsInt()
  barCode: number;
}
