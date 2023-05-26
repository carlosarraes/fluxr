import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator'

export class ExpenseDto {
  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  @IsNotEmpty()
  companyId: number

  @IsNumber()
  @IsNotEmpty()
  categoryId: number

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  transactionDate: Date

  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsBoolean()
  @IsNotEmpty()
  recurring: boolean

  @IsString()
  recurringInterval: string
}
