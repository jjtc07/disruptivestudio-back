import { ITheme } from '../domain'
import { ThemeRepository } from '../domain/theme-repository'

export class GetAllThemesUseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async exec(): Promise<Array<ITheme>> {
    return this.themeRepository.find(
      {},
      {
        _id: 1,
        id: 1,
        name: 1,
        cover: 1,
        description: 1,
        category: 1,
        createdBy: 1,
        coverUrl: 1,
      },
      [
        {
          path: 'category',
          select: '_id id name key banner content typeContent bannerUrl',
        },
      ]
    )
  }
}
