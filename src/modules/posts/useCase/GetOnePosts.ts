import { BaseException } from '../../../core/domain/contracts/BaseException'
import { StatusCode } from '../../common/enums'
import { IPosts } from '../domain'
import { PostsRepository } from '../domain/posts-repository'

export class GetOnePostsUseCase {
  constructor(private readonly postsRepository: PostsRepository) {}

  async exec(postId: string): Promise<IPosts> {
    const post = await this.postsRepository.findOne(
      {
        _id: postId,
      },
      {
        _id: 1,
        id: 1,
        title: 1,
        cover: 1,
        coverUrl: 1,
        description: 1,
        createdAt: 1,
        themes: 1,
        createdBy: 1,
      },
      [
        {
          path: 'themes',
          select: '_id id name coverUrl cover description',
        },
        {
          path: 'createdBy',
          select: '_id id username email',
        },
      ]
    )

    if (!post) {
      throw new BaseException(StatusCode.NOT_FOUND, 'Post not found')
    }

    return post
  }
}
