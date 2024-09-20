import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductTypeService } from './product_type/productType.service';

@Module({
  providers: [ProductService, PrismaService, ProductTypeService],
  controllers: [ProductController],
})
export class ProductModule {}
