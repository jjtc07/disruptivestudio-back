import { IPosts } from '../domain'
import { PostsRepository } from '../domain/posts-repository'

export class GetAllPostsUseCase {
  constructor(private readonly postsRepository: PostsRepository) {}

  async exec(): Promise<Array<IPosts>> {
    return this.postsRepository.find(
      {},
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
      ]
    )
  }
}
