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

  async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const posts = await this.getAllPostsUseCase.exec()

      res.status(StatusCode.OK).json(posts)
    } catch (err) {
      next(err)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const postsId = req.params?.postsId as string

      if (!postsId) {
        throw new BaseException(StatusCode.BAD_REQUEST, 'postsId is required')
      }

      const post = await this.getOnePostsUseCase.exec(postsId)

      res.status(StatusCode.OK).json(post)
    } catch (err: any) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, themes } = req.body
      const cover = req.file?.path
      const createdBy = req?.user?.id

      if (!cover) {
        throw new BaseException(StatusCode.BAD_REQUEST, 'Cover is required')
      }

      const post = await this.createPostsUseCase.exec({
        name,
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
