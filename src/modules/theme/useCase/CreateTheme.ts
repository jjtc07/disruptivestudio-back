import { BaseException } from '../../../core/domain/contracts/BaseException'
import { StatusCode } from '../../common/enums'
import { ITheme } from '../domain'
import { ThemeRepository } from '../domain/theme-repository'

export class CreateThemeUseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async exec({
    name,
    cover,
    description,
    category,
    createdBy,
  }: {
    name: string
    cover: string
    description: string
    category: string
    createdBy: string
  }): Promise<ITheme> {
    const themeExist = await this.themeRepository.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
    })

    if (themeExist) {
      throw new BaseException(
        StatusCode.BAD_REQUEST,
        'The theme is already in use'
      )
    }

    const theme = await this.themeRepository.create({
      name,
      cover,
      description,
      category,
      createdBy,
    })

    return theme
  }
}
