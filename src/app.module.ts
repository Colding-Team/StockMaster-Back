import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductTypeService } from './product/product_type/productType.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ProductController } from './product/product.controller';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, UserModule, ProductModule, PrismaModule],
  controllers: [AppController, ProductController],
  providers: [
    AppService,
    UserService,
    ProductService,
    ProductTypeService,
    PrismaService,
  ],
})
export class AppModule {}
