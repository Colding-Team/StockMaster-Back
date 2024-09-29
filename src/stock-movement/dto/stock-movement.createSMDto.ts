import { StockMovementType } from "@prisma/client";
import { IsEnum, IsNumber, IsString, IsDate, IsOptional } from "class-validator";

export class CreateStockMovementDto {
  @IsEnum(StockMovementType)
  type: StockMovementType;

  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;

  @IsDate()
  @IsOptional()
  date: Date;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  userId: number;
}