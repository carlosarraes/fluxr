import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ExpenseDto, RevenueDto } from './dto'

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createExpense(userId: number, dto: ExpenseDto) {
    await this.verifyExists('category', dto.categoryId)
    await this.verifyExists('company', dto.companyId)
    await this.verifyExists('user', userId)

    const transaction = this.prisma.expense.create({
      data: {
        description: dto.description,
        amount: dto.amount,
        transactionDate: dto.transactionDate,
        recurring: dto.recurring,
        recurringInterval: dto.recurringInterval,
        category: {
          connect: {
            id: dto.categoryId,
          },
        },
        company: {
          connect: {
            id: dto.companyId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return transaction
  }

  async createRevenue(userId: number, dto: RevenueDto) {
    await this.verifyExists('company', dto.companyId)
    await this.verifyExists('user', userId)

    const transaction = this.prisma.revenue.create({
      data: {
        transactionDate: dto.transactionDate,
        cash: dto.cash,
        pix: dto.pix,
        credit: dto.credit,
        debit: dto.debit,
        meal: dto.meal,
        tip: dto.tip,
        total: dto.cash + dto.pix + dto.credit + dto.debit + dto.meal,
        company: {
          connect: {
            id: dto.companyId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return transaction
  }

  private async verifyExists(model: string, id: number) {
    const exists = await this.prisma[model].findUnique({
      where: {
        id,
      },
    })

    if (!exists)
      throw new HttpException(`${model} not found`, HttpStatus.NOT_FOUND)
  }
}
