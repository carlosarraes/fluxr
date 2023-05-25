import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CompanyDto } from './dto'

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async createCompany(dto: CompanyDto) {
    const company = await this.prisma.company.findFirst({
      where: {
        name: dto.cnpj,
      },
    })

    if (company) {
      throw new HttpException('Company already exists', HttpStatus.BAD_REQUEST)
    }

    return this.prisma.company.create({
      data: {
        ...dto,
      },
    })
  }

  async getCompany(id: number) {
    const company = this.prisma.company.findUnique({
      where: {
        id,
      },
    })

    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND)
    }

    return company
  }
}
