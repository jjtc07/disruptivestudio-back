import { IPosts } from '../domain'
import { PostsRepository } from '../domain/posts-repository'

interface GetAllPostsUseCaseParams {
  themeId?: string
  search?: string
}

export class GetAllPostsUseCase {
  constructor(private readonly postsRepository: PostsRepository) {}

  async exec({
    themeId,
    search,
  }: GetAllPostsUseCaseParams): Promise<Array<IPosts>> {
    const query: any = {}

    if (themeId) {
      query.themes = themeId
    }

    if (search) {
      query.title = { $regex: new RegExp(search, 'i') }
    }

    return this.postsRepository.find(
      query,
      {
        _id: 1,
        id: 1,
        title: 1,
        cover: 1,
        description: 1,
        themes: 1,
        createdBy: 1,
        coverUrl: 1,
      },
      [
        {
          path: 'themes',
          select: '_id id name coverUrl',
        },
        {
          path: 'createdBy',
          select: 'id username email',
        },
      ],
      {
        sort: { createdAt: -1 },
      }
    )
  }
}
