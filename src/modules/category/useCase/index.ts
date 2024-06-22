import { categoryRepository } from '../domain'
import { CreateCategoryUseCase } from './CreateCategory'
import { GetAllCategoriesUseCase } from './GetAllCategories'
import { GetOneCategoryUseCase } from './GetOneCategory'

const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository)
const getOneCategoryUseCase = new GetOneCategoryUseCase(categoryRepository)
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)

export { getAllCategoriesUseCase, getOneCategoryUseCase, createCategoryUseCase }
