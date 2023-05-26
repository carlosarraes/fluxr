import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  getAllCategories() {
    return this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    })
  }
}
