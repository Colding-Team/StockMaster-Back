import { Body, Controller, Get, Param, Post, Put, Query, Request, UseGuards, NotFoundException, Req, Delete } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.createProductDto';
import { AuthGuard } from '../auth/auth.guard'; // Import your custom AuthGuard
import { UpdateProductDto } from './dto/product.updateProductDto';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async createProduct(
    @Body() productData: CreateProductDto,
    @Request() req,
  ): Promise<Product> {
    const userEmail = req.user.email;

    return this.productService.createProduct(productData, userEmail);
  }

  @Get('id/:productId')
  async byProductId(
    @Param('productId') productId: string,
    @Request() req
  ): Promise<Product> {
    const userEmail = req.user.email;
    const product = await this.productService.product({ productId: productId }, userEmail);
    if (!product) {
      throw new NotFoundException(`Produto com ID ${productId} não encontrado`);
    }
    return product;
  }

  @Get('name/:productName')
  async byName(
    @Param('productName') productName: string,
    @Request() req
  ): Promise<Product> {
    const userEmail = req.user.email;
    const product = await this.productService.product({ name: productName }, userEmail);
    if (!product) {
      throw new NotFoundException(`Produto com nome ${productName} não encontrado`);
    }
    return product;
  }

  @Put('id/:productId')
  async updateProductById(@Param('productId') productId: string, @Request() req, @Body() productData: UpdateProductDto) {
    const userEmail = req.user.email;
    const product = await this.productService.product({ productId: productId }, userEmail);
    if (!product) {
      throw new NotFoundException(`Produto com ID ${productId} não encontrado`);
    }
    return this.productService.updateProduct({
      where: { id: product.id },
      data: productData,
    });
  }

  @Put('name/:productName')
  async updateProduct(@Param('productName') productName: string, @Request() req, @Body() productData: UpdateProductDto) {
    const userEmail = req.user.email
    const product = await this.productService.product({ name: productName }, userEmail);
    if (!product) {
      throw new NotFoundException(`Produto com nome ${productName} não encontrado`);
    }
    return this.productService.updateProduct({
      where: { id: product.id },
      data: productData,
    });
  }

  @Delete('id/:productId')
  async deleteProductById(@Param('productId') productId: string, @Request() req) {
    const userEmail = req.user.email;
    const product = await this.productService.product({ productId: productId }, userEmail);
    if (!product) {
      throw new NotFoundException(`Produto com ID ${productId} não encontrado`);
    }
    return this.productService.deleteProduct({ id: product.id });
  }

  @Delete('name/:productName')
  async deleteProduct(@Param('productName') productName: string, @Request() req) {
    const userEmail = req.user.email;
    const product = await this.productService.product({ name: productName }, userEmail);
    if (!product) {
      throw new NotFoundException(`Produto com nome ${productName} não encontrado`);
    }
    return this.productService.deleteProduct({ id: product.id });
  }

  @Get('all')
  async getAllProducts(@Request() req) {
    const userEmail = req.user.email;
    return this.productService.products({ userEmail: userEmail });
  }

  @Get('all/names')
  async getAllProductNames(@Request() req) {
    const userEmail = req.user.email;
    return this.productService.getAllProductNames(userEmail);
  }

  @Get('all/cost')
  async getAllProductCost(@Request() req) {
    const userEmail = req.user.email;
    return this.productService.getAllProductCost(userEmail);
  }
}
