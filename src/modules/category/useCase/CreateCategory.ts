import { BaseException } from '../../../core/domain/contracts/BaseException'
import { StatusCode } from '../../common/enums'
import { CategoryDocument } from '../domain'
import { CategoryRepository } from '../domain/category-repository'

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async exec({
    name,
    content,
    banner,
    createdBy,
  }: {
    name: string
    content: string
    banner: string
    createdBy: string
  }): Promise<CategoryDocument> {
    const categoryExist = await this.categoryRepository.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
    })

    if (categoryExist) {
      throw new BaseException(StatusCode.BAD_REQUEST, 'The category is already')
    }

    const category = await this.categoryRepository.create({
      name,
      content,
      banner,
      createdBy,
    })

    return category
  }
}
