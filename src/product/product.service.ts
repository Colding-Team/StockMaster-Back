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
  ) {}

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
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    let productType: ProductType | null =
      await this.prisma.productType.findUnique({
        where: { id: data.typeId },
      });

    if (!productType) {
      productType = await this.productTypeService.createProductType({
        name: data.type,
      });
    }

    const existingProduct = await this.prisma.product.findFirst({
      where: { OR: [{ productId: data.productId }, { name: data.name }] },
    });

    if (existingProduct) {
      throw new BadRequestException('Já existe um produto com este nome!');
    }

    return this.prisma.product.create({
      data: {
        name: data.name,
        productId: data.productId,
        typeId: productType.id,
        cost: data.cost,
        price: data.price,
        weight: data.weight,
        imgUrl: data.imgUrl,
        batch: data.batch,
        barCode: data.barCode,
        quantity: data.quantity,
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
