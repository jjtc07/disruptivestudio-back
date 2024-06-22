import { BaseException } from '../../../core/domain/contracts/BaseException'
import { StatusCode } from '../../common/enums'
import { IPosts } from '../domain'
import { PostsRepository } from '../domain/posts-repository'

export class GetOnePostsUseCase {
  constructor(private readonly postsRepository: PostsRepository) {}

  async exec(postId: string): Promise<IPosts> {
    const post = await this.postsRepository.findOne({
      _id: postId,
    })

    if (!post) {
      throw new BaseException(StatusCode.NOT_FOUND, 'Post not found')
    }

    return post
  }
}
