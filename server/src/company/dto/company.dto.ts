import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator'

export class CompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @Matches(/^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/, {
    message: 'CNPJ must follow the pattern: 00.000.000/0000-00',
  })
  cnpj: string

  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsNumber()
  @IsNotEmpty()
  initialDeposit: number
}
