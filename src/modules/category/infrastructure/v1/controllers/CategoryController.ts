import { Request, Response } from 'express'
import { GetAllCategories } from '../../../useCase/GetAllCategories'
import { GetOneCategory } from '../../../useCase/GetOneCategory'
import { CreateCategory } from '../../../useCase/CreateCategory'

export class CategoryController {
  constructor(
    private readonly getAllCategories: GetAllCategories,
    private readonly getOneCategory: GetOneCategory,
    private readonly createCategory: CreateCategory
  ) {}

  async getAll(_: Request, res: Response) {
    const categories = await this.getAllCategories.exec()

    res.status(200).json(categories)
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = req.query?.id as unknown as string

      if (!id) {
        throw new Error('Category id is required')
      }

      const category = this.getOneCategory.exec(id)

      res.status(200).json(category)
    } catch (err: any) {
      res.status(404).json(err.message)
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name } = req.body

      const category = await this.createCategory.exec({
        name,
      })

      res.status(201).json(category)
    } catch (err: any) {
      res.status(400).json(err.message)
    }
  }
}
