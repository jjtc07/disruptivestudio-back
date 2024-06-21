import { NextFunction, Request, Response } from 'express'
import { GetAllThemes } from '../../../useCase/GetAllTheme'
import { GetOneTheme } from '../../../useCase/GetOneTheme'
import { CreateTheme } from '../../../useCase/CreateTheme'

export class ThemeController {
  constructor(
    private readonly getAllTheme: GetAllThemes,
    private readonly getOneTheme: GetOneTheme,
    private readonly createTheme: CreateTheme
  ) {}

  async getAllThemes(_: Request, res: Response, next: NextFunction) {
    try {
      const themes = await this.getAllTheme.exec()

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

      const theme = await this.getOneTheme.exec(themeId)

      res.status(200).json(theme)
    } catch (err: any) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, typeContent, permissions } = req.body
      const cover = req.file?.path
      const userId = req.body.user.id

      if (!cover) {
        throw new Error('Cover is required')
      }

      const theme = await this.createTheme.exec({
        name,
        cover,
        description,
        typeContent,
        permissions,
        createdBy: userId,
      })

      res.status(201).json(theme)
    } catch (err: any) {
      next(err)
    }
  }
}
