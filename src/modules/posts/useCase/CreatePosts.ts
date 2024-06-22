import { BaseException } from '../../../core/domain/contracts/BaseException'
import { StatusCode } from '../../common/enums'
import { IPosts } from '../domain'
import { PostsRepository } from '../domain/posts-repository'

export class CreatePostsUseCase {
  constructor(private readonly postsRepository: PostsRepository) {}

  async exec({
    name,
    cover,
    description,
    themes,
    createdBy,
  }: {
    name: string
    cover: string
    description: string
    themes: string[]
    createdBy: string
  }): Promise<IPosts> {
    const postExist = await this.postsRepository.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
    })

    if (postExist) {
      throw new BaseException(
        StatusCode.BAD_REQUEST,
        'The post is already in use'
      )
    }

    const post = await this.postsRepository.create({
      name,
      cover,
      description,
      themes,
      createdBy,
    })

    return post
  }
}
