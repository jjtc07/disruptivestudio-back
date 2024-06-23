import { NextFunction, Request, Response } from 'express'
import { GetAllThemesUseCase } from '../../../useCase/GetAllTheme'
import { GetOneThemeUseCase } from '../../../useCase/GetOneTheme'
import { CreateThemeUseCase } from '../../../useCase/CreateTheme'
import { BaseException } from '../../../../../core/domain/contracts/BaseException'
import { StatusCode } from '../../../../common/enums'

export class ThemeController {
  constructor(
    private readonly getAllThemeUseCase: GetAllThemesUseCase,
    private readonly getOneThemeUseCase: GetOneThemeUseCase,
    private readonly createThemeUseCase: CreateThemeUseCase
  ) {}

  async getAllThemes(_: Request, res: Response, next: NextFunction) {
    try {
      const themes = await this.getAllThemeUseCase.exec()

      res.status(StatusCode.OK).json(themes)
    } catch (err) {
      next(err)
    }
  }

  async geThemeById(req: Request, res: Response, next: NextFunction) {
    try {
      const themeId = req.params?.themeId as unknown as string

      if (!themeId) {
        throw new BaseException(StatusCode.BAD_REQUEST, 'ThemeId is required')
      }

      const theme = await this.getOneThemeUseCase.exec(themeId)

      res.status(StatusCode.OK).json(theme)
    } catch (err: any) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, category } = req.body
      const cover = req.file?.path
      const createdBy = req?.user?.id

      if (!cover) {
        throw new BaseException(StatusCode.BAD_REQUEST, 'Cover is required')
      }

      const theme = await this.createThemeUseCase.exec({
        name,
        cover,
        description,
        category,
        createdBy,
      })

      res.status(StatusCode.CREATED).json(theme)
    } catch (err: any) {
      next(err)
    }
  }
}
