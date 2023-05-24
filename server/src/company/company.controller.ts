import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CompanyService } from './company.service'
import { CompanyDto } from './dto'

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  createCompany(@Body() dto: CompanyDto) {
    return this.companyService.createCompany(dto)
  }

  @Get(':id')
  getCompany(@Param('id') id: string) {
    return this.companyService.getCompany(Number(id))
  }
}
