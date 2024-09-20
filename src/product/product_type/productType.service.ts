import { Injectable } from '@nestjs/common';
import { Prisma, ProductType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductTypeService {
  constructor(private prisma: PrismaService) {}

  async productType(
    productTypeWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<ProductType | null> {
    return this.prisma.product.findUnique({
      where: productTypeWhereUniqueInput,
    });
  }

  async productTypes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductTypeWhereUniqueInput;
    where?: Prisma.ProductTypeWhereInput;
    orderBy?: Prisma.ProductTypeOrderByWithRelationInput;
  }): Promise<ProductType[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.productType.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProductType(
    data: Prisma.ProductTypeCreateInput,
  ): Promise<ProductType> {
    return this.prisma.productType.create({
      data,
    });
  }

  async updateProductType(params: {
    where: Prisma.ProductTypeWhereUniqueInput;
    data: Prisma.ProductTypeUpdateInput;
  }): Promise<ProductType> {
    const { where, data } = params;
    return this.prisma.productType.update({
      data,
      where,
    });
  }

  async deleteProductType(
    where: Prisma.ProductTypeWhereUniqueInput,
  ): Promise<ProductType> {
    return this.prisma.productType.delete({
      where,
    });
  }
}
