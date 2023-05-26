import { Transform } from 'class-transformer'
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator'

export class RevenueDto {
  @IsNumber()
  @IsNotEmpty()
  companyId: number

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  transactionDate: Date

  @IsNumber()
  @IsNotEmpty()
  cash: number

  @IsNumber()
  @IsNotEmpty()
  pix: number

  @IsNumber()
  @IsNotEmpty()
  credit: number

  @IsNumber()
  @IsNotEmpty()
  debit: number

  @IsNumber()
  @IsNotEmpty()
  meal: number
}
