import { CategoryController } from './CategoryController'
import {
  createCategory,
  getAllCategories,
  getOneCategory,
} from '../../../useCase'

const categoryController = new CategoryController(
  getAllCategories,
  getOneCategory,
  createCategory
)

export { categoryController }
