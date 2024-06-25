import { BaseException } from '../../../core/domain/contracts/BaseException'
import { StatusCode } from '../../common/enums'
import { IContent, IPosts } from '../domain'
import { PostsRepository } from '../domain/posts-repository'

interface CreatePostsUseCaseParams {
  title: string
  cover: string
  description: string
  themes: string[]
  content: IContent[]
  createdBy: string
}

export class CreatePostsUseCase {
  constructor(private readonly postsRepository: PostsRepository) {}

  async exec({
    title,
    cover,
    description,
    themes,
    content,
    createdBy,
  }: CreatePostsUseCaseParams): Promise<IPosts> {
    /*
    TODO: por si se quiere validar que sea una única publicación

    const postExist = await this.postsRepository.findOne({
      title: { $regex: new RegExp(`^${title}$`, 'i') },
    })

    if (postExist) {
      throw new BaseException(
        StatusCode.BAD_REQUEST,
        'A post with that title is already in use'
      )
    }
    */

    return this.postsRepository.create({
      title,
      cover,
      description,
      themes,
      content,
      createdBy,
    })
  }
}
