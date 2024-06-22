import { IPosts } from '../domain'
import { PostsRepository } from '../domain/posts-repository'

export class GetAllPostsUseCase {
  constructor(private readonly postsRepository: PostsRepository) {}

  async exec(): Promise<Array<IPosts>> {
    return this.postsRepository.find({})
  }
}
