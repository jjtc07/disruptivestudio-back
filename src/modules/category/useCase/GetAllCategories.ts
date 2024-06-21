import { ICategory } from '../domain'
import { CategoryRepository } from '../domain/category-repository'

export class GetAllCategories {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async exec(): Promise<Array<ICategory>> {
    const categories = this.categoryRepository.find({})

    return categories
  }
}
