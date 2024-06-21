import { categoryRepository } from '../domain'
import { CreateCategory } from './CreateCategory'
import { GetAllCategories } from './GetAllCategories'
import { GetOneCategory } from './GetOneCategory'

const getAllCategories = new GetAllCategories(categoryRepository)
const getOneCategory = new GetOneCategory(categoryRepository)
const createCategory = new CreateCategory(categoryRepository)

export { getAllCategories, getOneCategory, createCategory }
