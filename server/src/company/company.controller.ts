import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CompanyService } from './company.service'
import { CompanyDto } from './dto'

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  createCompany(@Body() dto: CompanyDto) {
    try {
      return this.companyService.createCompany(dto)
    } catch (error) {
      return error
    }
  }

  @Get(':id')
  getCompany(@Param('id') id: string) {
    try {
      return this.companyService.getCompany(Number(id))
    } catch (error) {
      return error
    }
  }
}
