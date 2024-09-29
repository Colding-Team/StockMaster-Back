import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Product, ProductType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductTypeService } from './product_type/productType.service';
import { CreateProductDto } from './dto/product.createProductDto';
import { UpdateProductDto } from './dto/product.updateProductDto';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private productTypeService: ProductTypeService,
  ) { }

  async product(
    productWhereInput: Prisma.ProductWhereInput,
    userEmail: string,
  ): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: {
        ...productWhereInput,
        user: {
          email: userEmail
        }
      },
    });
  }

  async products(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
    userId?: number;
    userEmail: string;
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy, userId, userEmail } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where: {
        ...where,
        userId,
        type: {
          name: where?.type?.name,
        },
        user: {
          email: userEmail
        }
      },
      orderBy,
    });
  }

  async createProduct(
    data: CreateProductDto,
    userEmail: string,
  ): Promise<Product> {
    let productType: ProductType | null = null;
    if (data.type) {
      productType = await this.prisma.productType.findFirst({
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

    const existingBarCode = await this.prisma.product.findFirst({
      where: { barCode: data.barCode },
      select: { name: true, productId: true }
    });
    if (existingBarCode) {
      throw new BadRequestException(`Já existe um produto com este código de barras (${data.barCode})! Produto: ${existingBarCode.name} ID: ${existingBarCode.productId}`);
    }

    const user = await this.prisma.user.findUnique({
      where: { email: userEmail },
    });

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
        user: {
          connect: { id: user.id },
        },
      },
    });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: UpdateProductDto;
  }): Promise<Product> {
    const { where, data } = params;
    const updateData: Prisma.ProductUpdateInput = {
      name: data.name,
      productId: data.productId,
      cost: data.cost,
      price: data.price,
      weight: data.weight,
      imgUrl: data.imgUrl,
      batch: data.batch,
      barCode: data.barCode,
    };

    if (data.typeId) {
      updateData.type = { connect: { id: data.typeId } };
    }

    return this.prisma.product.update({
      data: updateData,
      where,
    });
  }

  async getProductByIdentifier(productIdentifier: string, userEmail: string): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: {
        OR: [
          { productId: productIdentifier },
          { name: productIdentifier },
        ],
        user: {
          email: userEmail
        }
      },
    });
  }

  async updateProductQuantity(productId: number, quantity: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId }
    });
    if (!product) {
      throw new NotFoundException(`Produto não encontrado para o identificador: ${productId}`);
    } else if (product.quantity + quantity < 0) {
      throw new BadRequestException(`Quantidade insuficiente em estoque! Quantidade atual: ${product.quantity}`);
    }

    return this.prisma.product.update({
      data: { quantity: { increment: quantity } },
      where: { id: productId },
    });
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({
      where,
    });
  }

  async getAllProductNames(userEmail: string): Promise<string[]> {
    const products = await this.prisma.product.findMany({
      where: {
        user: {
          email: userEmail
        }
      },
      select: {
        name: true
      }
    });

    return products.map(product => product.name);
  }

  async getAllProductCost(userEmail: string): Promise<number[]> {
    const products = await this.prisma.product.findMany({
      where: {
        user: {
          email: userEmail
        }
      },
      select: {
        cost: true
      }
    });

    return products.map(product => product.cost);
  }
}
