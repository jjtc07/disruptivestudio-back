import { BaseException } from '../../../core/domain/contracts/BaseException'
import { StatusCode } from '../../common/enums'
import { ITheme } from '../domain'
import { ThemeRepository } from '../domain/theme-repository'

export class GetOneThemeUseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async exec(themeId: string): Promise<ITheme> {
    const theme = await this.themeRepository.findOne({
      _id: themeId,
    })

    if (!theme) {
      throw new BaseException(StatusCode.NOT_FOUND, 'Theme not found')
    }

    return theme
  }
}
