import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Product, ProductType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductTypeService } from './product_type/productType.service';
import { CreateProductDto } from './dto/product.createProductDto';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private productTypeService: ProductTypeService,
  ) { }

  async product(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: productWhereUniqueInput,
    });
  }

  async products(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
    userId?: number;
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy, userId } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where: {
        ...where,
        userId,
      },
      orderBy,
    });
  }

  async createProduct(
    data: CreateProductDto,
    userEmail: string,
  ): Promise<Product> {
    let productType: ProductType | null = null;
    if (data.typeId) {
      productType = await this.prisma.productType.findUnique({
        where: { id: data.typeId },
      });
    } else if (data.type) {
      productType = await this.prisma.productType.findUnique({
        where: { name: data.type },
      });
      if (!productType && data.type) {
        productType = await this.productTypeService.createProductType({
          name: data.type,
        });
      }
    }

    const existingProduct = await this.prisma.product.findFirst({
      where: { OR: [{ productId: data.productId }, { name: data.name }] },
    });

    if (existingProduct) {
      throw new BadRequestException('Já existe um produto com este nome ou ID!');
    }

    const user = await this.prisma.user.findUnique({
      where: { email: userEmail },
    });

    const existingBarCode = await this.prisma.product.findFirst({
      where: { barCode: data.barCode },
      select: { name: true, productId: true }
    });
    if (existingBarCode) {
      throw new BadRequestException(`Já existe um produto com este código de barras (${data.barCode})! Produto: ${existingBarCode.name} ID: ${existingBarCode.productId}`);
    }

    return this.prisma.product.create({
      data: {
        name: data.name,
        productId: data.productId,
        type: productType ? { connect: { id: productType.id } } : undefined,
        cost: data.cost,
        price: data.price,
        weight: data.weight,
        imgUrl: data.imgUrl,
        batch: data.batch,
        barCode: data.barCode,
        quantity: data.quantity,
        user: {
          connect: { id: user.id },
        },
      },
    });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    const { where, data } = params;
    return this.prisma.product.update({
      data,
      where,
    });
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({
      where,
    });
  }
}
