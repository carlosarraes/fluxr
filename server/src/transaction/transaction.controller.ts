import { Controller, Post, UseGuards } from '@nestjs/common'
import { JwtGuard } from 'src/auth/guard'
import { TransactionService } from './transaction.service'

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @UseGuards(JwtGuard)
  @Post()
  createTransaction() {
    return { message: 'Transaction created' }
  }
}
