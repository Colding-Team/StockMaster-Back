import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { StockMovementModule } from './stock-movement/stock-movement.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    PrismaModule,
    StockMovementModule,
    EmailModule,
  ],
})
export class AppModule {}
