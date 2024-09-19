import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { ProductService } from './product/product.service';
import { Product, ProductType } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @Get('product/:id')
  async ById(@Param('id') id: string): Promise<Product> {
    return this.productService.product({ id: Number(id) });
  }

  @Post('product')
  async createProduct(
    @Body()
    productData: {
      name: string;
      productId: number;
      type: string;
      typeId: number;
      cost: number;
      price: number;
      weight: number;
      imgUrl?: string;
      batch?: string;
      barCode: number;
      quantity: number;
    },
  ): Promise<Product> {
    const {
      name,
      productId,
      type,
      typeId,
      cost,
      price,
      weight,
      imgUrl,
      batch,
      barCode,
      quantity,
    } = productData;
    return this.productService.createProduct({
      name,
      productId,
      type: { connect: { name: productType } },
      typeId,
      cost,
      price,
      weight,
      imgUrl,
      batch,
      barCode,
      quantity,
    });
  }
}
