import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  companyId: number

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  role: string

  @IsNotEmpty()
  @IsString()
  password: string
}
