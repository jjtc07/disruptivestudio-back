import { Theme } from '../domain'
import { ThemeRepository } from '../domain/theme-repository'

export class GetAllThemes {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async exec(): Promise<Array<Theme>> {
    const themes = this.themeRepository.find({})

    return themes
  }
}
