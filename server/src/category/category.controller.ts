import { Controller, Get } from '@nestjs/common'
import { CategoryService } from './category.service'

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAllCategories() {
    try {
      return this.categoryService.getAllCategories()
    } catch (error) {
      throw new Error(error)
    }
  }
}
