import { Module } from '@nestjs/common';
import { StockMovementService } from './stock-movement.service';
import { StockMovementController } from './stock-movement.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from 'src/user/user.service';
import { ProductTypeService } from 'src/product/product_type/productType.service';

@Module({
  imports: [ProductModule, UserModule, PrismaModule],
  providers: [StockMovementService, PrismaService, UserService, ProductService, ProductTypeService],
  controllers: [StockMovementController]
})
export class StockMovementModule { }
