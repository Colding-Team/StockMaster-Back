import { Injectable } from '@nestjs/common';
import { Prisma, StockMovement } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StockMovementService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async createStockMovement(data: Prisma.StockMovementCreateInput): Promise<StockMovement> {
    return this.prisma.stockMovement.create({
      data,
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

  async getStockMovements(stockMovementWhereInput: Prisma.StockMovementWhereInput, userEmail: string): Promise<StockMovement[]> {
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
