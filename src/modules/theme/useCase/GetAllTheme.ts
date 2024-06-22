import { ITheme } from '../domain'
import { ThemeRepository } from '../domain/theme-repository'

export class GetAllThemesUseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async exec(): Promise<Array<ITheme>> {
    return this.themeRepository.find({})
  }
}
