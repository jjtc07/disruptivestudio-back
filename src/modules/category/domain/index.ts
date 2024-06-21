import { CategoryRepository } from './category-repository'
import { Category } from './category.model'

export * from './category.model'

const categoryRepository = new CategoryRepository(Category)

export { categoryRepository }
