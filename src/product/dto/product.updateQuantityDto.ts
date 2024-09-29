import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class UpdateQuantityDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
