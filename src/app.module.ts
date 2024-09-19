import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductTypeService } from './product_type/product_type.service';
import { FodaseService } from './fodase/fodase.service';

@Module({
  imports: [AuthModule, UsersModule, ProductsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, ProductsService, PrismaService, ProductTypeService, FodaseService],
})
export class AppModule {}
