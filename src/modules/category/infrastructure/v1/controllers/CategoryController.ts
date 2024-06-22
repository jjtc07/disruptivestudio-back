import { NextFunction, Request, Response } from 'express'
import { GetAllCategoriesUseCase } from '../../../useCase/GetAllCategories'
import { GetOneCategoryUseCase } from '../../../useCase/GetOneCategory'
import { CreateCategoryUseCase } from '../../../useCase/CreateCategory'
import { StatusCode } from '../../../../common/enums'

export class CategoryController {
  constructor(
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly getOneCategoryUseCase: GetOneCategoryUseCase,
    private readonly createCategoryUseCase: CreateCategoryUseCase
  ) {}

  async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.getAllCategoriesUseCase.exec()

      res.status(StatusCode.OK).json(categories)
    } catch (err) {
      next(err)
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.query?.id as unknown as string

      if (!id) {
        throw new Error('Category id is required')
      }

      const category = this.getOneCategoryUseCase.exec(id)

      res.status(StatusCode.OK).json(category)
    } catch (err: any) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, content } = req.body
      const banner = req.file?.path
      const createdBy = req?.user?.id

      if (!banner) {
        throw new Error('Banner is required')
      }

      const category = await this.createCategoryUseCase.exec({
        name,
        content,
        banner,
        createdBy,
      })

      res.status(StatusCode.CREATED).json(category)
    } catch (err: any) {
      next(err)
    }
  }
}
