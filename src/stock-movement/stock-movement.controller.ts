import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { StockMovementService } from './stock-movement.service';
import { AuthGuard } from '../auth/auth.guard';
import { StockMovement } from '@prisma/client';
import { CreateStockMovementDto } from './dto/stock-movement.createSMDto';
import { ProductService } from 'src/product/product.service';

@UseGuards(AuthGuard)
@Controller('stock-movement')
export class StockMovementController {
  constructor(
    private readonly stockMovementService: StockMovementService,
    private readonly productService: ProductService
  ) { }

  @Post()
  async createStockMovement(
    @Body() stockMovementData: CreateStockMovementDto,
    @Request() req
  ): Promise<StockMovement> {
    this.validateStockMovement(stockMovementData);
    const userEmail = req.user.email;

    const product = await this.productService.product({ productId: stockMovementData.productId }, userEmail);

    if (!product) {
      throw new NotFoundException(`Produto com ID ${stockMovementData.productId} não encontrado`);
    }

    try {
      return await this.stockMovementService.createStockMovement(stockMovementData, product.productId, userEmail);
    } catch (error) {
      throw new InternalServerErrorException('Falha ao criar movimento de estoque');
    }
  }

  private validateStockMovement(stockMovementData: CreateStockMovementDto): void {
    if (!['IN', 'OUT'].includes(stockMovementData.type)) {
      throw new BadRequestException('Tipo de movimento inválido. Use "IN" ou "OUT".');
    }

    if (stockMovementData.type === 'OUT') {
      stockMovementData.quantity *= -1;
    }

    if (stockMovementData.quantity === 0) {
      throw new BadRequestException('Quantidade não pode ser zero');
    }

    if (stockMovementData.type === 'IN' && stockMovementData.quantity < 0) {
      throw new BadRequestException('Quantidade deve ser positiva para movimentos IN');
    }
    if (stockMovementData.type === 'OUT' && stockMovementData.quantity > 0) {
      throw new BadRequestException('Quantidade deve ser negativa para movimentos OUT');
    }
  }
}