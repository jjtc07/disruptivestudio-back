import { Theme } from '../domain'
import { ThemeRepository } from '../domain/theme-repository'

export class GetOneTheme {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async exec(themeId: string): Promise<Theme> {
    const theme = await this.themeRepository.findOne({
      _id: themeId,
    })

    if (!theme) {
      throw new Error('Theme not found')
    }

    return theme
  }
}
