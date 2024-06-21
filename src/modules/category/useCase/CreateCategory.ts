import { CategoryDocument } from '../domain'
import { CategoryRepository } from '../domain/category-repository'

export class CreateCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async exec({ name }: { name: string }): Promise<CategoryDocument> {
    const categoryExist = await this.categoryRepository.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
    })

    if (categoryExist) {
      throw new Error('The category is already')
    }

    const category = await this.categoryRepository.create({
      name,
    })

    return category
  }
}
