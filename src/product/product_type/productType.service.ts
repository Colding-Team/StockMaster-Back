import { Injectable } from '@nestjs/common';
import { Prisma, ProductType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductTypeDto } from './dto/productType.createProductTypeDto';

@Injectable()
export class ProductTypeService {
  constructor(private prisma: PrismaService) { }

  async productType(
    productTypeWhereUniqueInput: Prisma.ProductTypeWhereUniqueInput,
  ): Promise<ProductType | null> {
    return this.prisma.productType.findFirst({
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

  async createProductType(data: CreateProductTypeDto): Promise<ProductType> {
    return this.prisma.productType.create({
      data: {
        name: data.name,
      },
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
