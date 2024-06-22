import { NextFunction, Request, Response } from 'express'
import { BaseException } from '../../../../../core/domain/contracts/BaseException'
import { StatusCode } from '../../../../common/enums'
import {
  CreatePostsUseCase,
  GetAllPostsUseCase,
  GetOnePostsUseCase,
} from '../../../useCase'

export class PostsController {
  constructor(
    private readonly getAllPostsUseCase: GetAllPostsUseCase,
    private readonly getOnePostsUseCase: GetOnePostsUseCase,
    private readonly createPostsUseCase: CreatePostsUseCase
  ) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const themeId = req?.query?.themeId as string | undefined

      const posts = await this.getAllPostsUseCase.exec({ themeId })

      res.status(StatusCode.OK).json(posts)
    } catch (err) {
      next(err)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params?.postId as string

      if (!postId) {
        throw new BaseException(StatusCode.BAD_REQUEST, 'Post id is required')
      }

      const post = await this.getOnePostsUseCase.exec(postId)

      res.status(StatusCode.OK).json(post)
    } catch (err: any) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, themes } = req.body
      const cover = req.file?.path
      const createdBy = req?.user?.id

      if (!cover) {
        throw new BaseException(StatusCode.BAD_REQUEST, 'Cover is required')
      }

      const post = await this.createPostsUseCase.exec({
        title,
        cover,
        description,
        themes,
        createdBy,
      })

      res.status(StatusCode.CREATED).json(post)
    } catch (err: any) {
      next(err)
    }
  }
}
