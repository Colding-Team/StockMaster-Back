import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.createProductDto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('product/:id')
  async ById(@Param('id') id: string): Promise<Product> {
    return this.productService.product({ id: Number(id) });
  }

  @Post()
  async createProduct(@Body() productData: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(productData);
  }
}
