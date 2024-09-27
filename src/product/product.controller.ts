import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.createProductDto';
import { AuthGuard } from '../auth/auth.guard'; // Import your custom AuthGuard

@Controller('product')
@UseGuards(AuthGuard) // Apply the guard to all routes in this controller
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async createProduct(
    @Body() productData: CreateProductDto,
    @Request() req,
  ): Promise<Product> {
    // Access the user email from the request
    const userEmail = req.user.email;
    
    // Pass the email to the service method
    return this.productService.createProduct(productData, userEmail);
  }

  @Get(':id')
  async ById(@Param('id') id: string): Promise<Product> {
    return this.productService.product({ id: Number(id) });
  }
}
