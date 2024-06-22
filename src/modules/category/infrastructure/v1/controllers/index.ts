import { CategoryController } from './CategoryController'
import {
  createCategoryUseCase,
  getAllCategoriesUseCase,
  getOneCategoryUseCase,
} from '../../../useCase'

const categoryController = new CategoryController(
  getAllCategoriesUseCase,
  getOneCategoryUseCase,
  createCategoryUseCase
)

export { categoryController }
