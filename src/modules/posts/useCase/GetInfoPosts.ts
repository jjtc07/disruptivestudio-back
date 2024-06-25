import { PostsRepository } from '../domain/posts-repository'
import { getInfoPostPipeline } from '../pipeline'

export class GetInfoPostsUseCase {
  constructor(private readonly postsRepository: PostsRepository) {}

  async exec(): Promise<any> {
    const response = await this.postsRepository.aggregate(getInfoPostPipeline)

    const [infoPosts] = response

    return infoPosts
  }
}
