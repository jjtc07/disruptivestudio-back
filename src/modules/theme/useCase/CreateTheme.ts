import { BaseException } from '../../../core/domain/contracts/BaseException'
import { StatusCode } from '../../common/enums'
import { ITheme } from '../domain'
import { ThemeRepository } from '../domain/theme-repository'
import { TypeContentEnum } from '../enum'

export class CreateThemeUseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async exec({
    name,
    cover,
    description,
    categories,
    // typeContent,
    // permissions,
    createdBy,
  }: {
    name: string
    cover: string
    description: string
    categories: string[]
    // typeContent: TypeContentEnum[]
    // permissions: string[]
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
      // typeContent,
      categories,
      createdBy,
    })

    return theme
  }
}
