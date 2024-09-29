import { BadRequestException, Body, Controller, InternalServerErrorException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { StockMovementService } from './stock-movement.service';
import { AuthGuard } from '../auth/auth.guard';
import { StockMovement } from '@prisma/client';
import { CreateStockMovementDto } from './dto/stock-movement.createSMDto';
import { ProductService } from 'src/product/product.service';

@UseGuards(AuthGuard)
@Controller('stock-movement')
export class StockMovementController {
  constructor(private readonly stockMovementService: StockMovementService, private readonly productService: ProductService) { }

  @Post(':productId')
  async createStockMovementByProductId(
    @Body() stockMovementData: CreateStockMovementDto,
    @Param('productId') productId: string,
    @Request() req
  ): Promise<StockMovement> {
    this.validateStockMovement(stockMovementData);
    const userEmail = req.user.email;
    return this.stockMovementService.createStockMovement(stockMovementData, productId, userEmail);
  }

  @Post(':productName')
  async createStockMovementByProductName(
    @Body() stockMovementData: CreateStockMovementDto,
    @Param('productName') productName: string,
    @Request() req
  ): Promise<StockMovement> {
    this.validateStockMovement(stockMovementData);
    const userEmail = req.user.email;
    return this.stockMovementService.createStockMovement(stockMovementData, productName, userEmail);
  }

  private validateStockMovement(stockMovementData: CreateStockMovementDto): void {
    if (stockMovementData.type === 'OUT') {
      stockMovementData.quantity *= -1;
    }

    if (stockMovementData.type === 'IN' && stockMovementData.quantity < 0) {
      throw new BadRequestException('Quantity must be positive for IN movements');
    }
    if (stockMovementData.type === 'OUT' && stockMovementData.quantity > 0) {
      throw new BadRequestException('Quantity must be negative for OUT movements');
    }
  }
}