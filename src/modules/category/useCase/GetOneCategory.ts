import { ICategory } from '../domain'
import { CategoryRepository } from '../domain/category-repository'

export class GetOneCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async exec(categoryId: string): Promise<ICategory> {
    const category = await this.categoryRepository.findOne({
      _id: categoryId,
    })

    if (!category) {
      throw new Error('Category not found')
    }

    return category
  }
}
