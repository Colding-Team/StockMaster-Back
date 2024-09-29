import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProductEntryModule } from './product-entry/product-entry.module';

@Module({
  imports: [AuthModule, UserModule, ProductModule, PrismaModule, ProductEntryModule],
})
export class AppModule {}
