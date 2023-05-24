import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserDto } from './dto'
import * as argon from 'argon2'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: UserDto) {
    const hash = await argon.hash(dto.password)

    const company = await this.prisma.company.findFirst({
      where: {
        id: dto.companyId,
      },
    })

    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND)
    }

    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    })

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }

    return await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        role: dto.role,
        hash: hash,
        company: {
          connect: {
            id: dto.companyId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        company: {
          select: {
            name: true,
          },
        },
      },
    })
  }
}
