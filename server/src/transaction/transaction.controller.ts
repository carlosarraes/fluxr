import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { GetUser } from 'src/auth/decorator'
import { JwtGuard } from 'src/auth/guard'
import { ExpenseDto, RevenueDto } from './dto'
import { TransactionService } from './transaction.service'

@UseGuards(JwtGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('expense')
  async createExpense(@Body() dto: ExpenseDto, @GetUser('id') userId: number) {
    return await this.transactionService.createExpense(userId, dto)
  }

  @Post('revenue')
  async createRevenue(@Body() dto: RevenueDto, @GetUser('id') userId: number) {
    return await this.transactionService.createRevenue(userId, dto)
  }
}
