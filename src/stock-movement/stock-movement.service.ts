import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma, Product, StockMovement, StockMovementType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStockMovementDto } from './dto/stock-movement.createSMDto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class StockMovementService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductService
  ) { }

  async createStockMovement(
    data: CreateStockMovementDto,
    productIdentifier: string,
    userEmail: string
  ): Promise<StockMovement> {
    const product = await this.productService.getProductByIdentifier(productIdentifier, userEmail);

    if (!product) {
      throw new NotFoundException(`Produto não encontrado para o identificador: ${productIdentifier}`);
    }

    await this.productService.updateProductQuantity(product.id, data.quantity);

    return this.prisma.stockMovement.create({
      data: {
        type: data.type,
        product: {
          connect: { id: product.id },
        },
        quantity: data.quantity,
        date: new Date(),
        description: data.description,
        user: {
          connect: { email: userEmail },
        },
      },
    });
  }

  async getStockMovement(stockMovementWhereInput: Prisma.StockMovementWhereInput, userEmail: string): Promise<StockMovement | null> {
    return this.prisma.stockMovement.findFirst({
      where: {
        ...stockMovementWhereInput,
        user: {
          email: userEmail
        }
      },
    });
  }

  async getStockMovements(id: number, p0: Date, p1: Date, stockMovementWhereInput: Prisma.StockMovementWhereInput, userEmail: string): Promise<StockMovement[]> {
    return this.prisma.stockMovement.findMany({
      where: {
        ...stockMovementWhereInput,
        user: {
          email: userEmail
        }
      },
    });
  }
}