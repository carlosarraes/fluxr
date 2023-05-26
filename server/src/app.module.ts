import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { CompanyModule } from './company/company.module'
import { TransactionModule } from './transaction/transaction.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, CompanyModule, TransactionModule, CategoryModule],
})
export class AppModule {}
