import { StockMovementType } from "@prisma/client";
import { IsEnum, IsNumber, IsString, IsDate, IsOptional, IsNotEmpty } from "class-validator";

export class CreateStockMovementDto {
  @IsNotEmpty()
  @IsNumber()
  productId: string;

  @IsNotEmpty()
  @IsEnum(StockMovementType)
  type: StockMovementType;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsDate()
  date: Date;

  @IsString()
  @IsOptional()
  description?: string;
}