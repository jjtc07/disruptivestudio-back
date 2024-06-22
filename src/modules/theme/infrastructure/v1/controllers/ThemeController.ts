import { NextFunction, Request, Response } from 'express'
import { GetAllThemesUseCase } from '../../../useCase/GetAllTheme'
import { GetOneThemeUseCase } from '../../../useCase/GetOneTheme'
import { CreateThemeUseCase } from '../../../useCase/CreateTheme'

export class ThemeController {
  constructor(
    private readonly getAllThemeUseCase: GetAllThemesUseCase,
    private readonly getOneThemeUseCase: GetOneThemeUseCase,
    private readonly createThemeUseCase: CreateThemeUseCase
  ) {}

  async getAllThemes(_: Request, res: Response, next: NextFunction) {
    try {
      const themes = await this.getAllThemeUseCase.exec()

      res.status(200).json(themes)
    } catch (err) {
      next(err)
    }
  }

  async geThemeById(req: Request, res: Response, next: NextFunction) {
    try {
      const themeId = req.params?.themeId as unknown as string

      if (!themeId) {
        throw new Error('ThemeId is required')
      }

      const theme = await this.getOneThemeUseCase.exec(themeId)

      res.status(200).json(theme)
    } catch (err: any) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        description,
        categories,
        // typeContent,
        // permissions
      } = req.body
      const cover = req.file?.path
      const createdBy = req?.user?.id

      if (!cover) {
        throw new Error('Cover is required')
      }

      const theme = await this.createThemeUseCase.exec({
        name,
        cover,
        description,
        // typeContent,
        // permissions,
        categories,
        createdBy,
      })

      res.status(201).json(theme)
    } catch (err: any) {
      next(err)
    }
  }
}
