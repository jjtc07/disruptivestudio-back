import { Theme } from '../domain'
import { ThemeRepository } from '../domain/theme-repository'
import { TypeContentEnum } from '../enum'

export class CreateTheme {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async exec({
    name,
    cover,
    description,
    typeContent,
    permissions,
    createdBy,
  }: {
    name: string
    cover: string
    description: string
    typeContent: TypeContentEnum[]
    permissions: string[]
    createdBy: string
  }): Promise<Theme> {
    const themeExist = await this.themeRepository.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
    })

    if (themeExist) {
      throw new Error('The theme is already in use')
    }

    const theme = await this.themeRepository.create({
      name,
      cover,
      description,
      typeContent,
      permissions,
      createdBy,
    })

    return theme
  }
}
