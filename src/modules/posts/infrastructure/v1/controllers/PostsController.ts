import { NextFunction, Request, Response } from 'express'
import { BaseException } from '../../../../../core/domain/contracts/BaseException'
import { StatusCode } from '../../../../common/enums'
import {
  CreatePostsUseCase,
  GetAllPostsUseCase,
  GetOnePostsUseCase,
  ValidatePostUseCase,
} from '../../../useCase'
import { GetInfoPostsUseCase } from '../../../useCase/GetInfoPosts'

export class PostsController {
  constructor(
    private readonly getAllPostsUseCase: GetAllPostsUseCase,
    private readonly getOnePostsUseCase: GetOnePostsUseCase,
    private readonly createPostsUseCase: CreatePostsUseCase,
    private readonly validatePostUseCase: ValidatePostUseCase,
    private readonly getInfoPostsUseCase: GetInfoPostsUseCase
  ) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const themeId = req?.query?.themeId as string | undefined
      const search = req?.query?.search as string | undefined

      const posts = await this.getAllPostsUseCase.exec({ themeId, search })

      const infoPosts = await this.getInfoPostsUseCase.exec()

      res.status(StatusCode.OK).json({ posts, infoPosts })
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

      const post = await this.getOnePostsUseCase.exec(postId, req.user)

      res.status(StatusCode.OK).json(post)
    } catch (err: any) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        title,
        description,
        themes: themesStr,
        content: contentUrl,
      } = req.body
      const files: any = req.files

      const cover = files?.cover[0].path
      const createdBy = req?.user?.id

      if (!cover) {
        throw new BaseException(StatusCode.BAD_REQUEST, 'Cover is required')
      }

      const themes = Array.isArray(themesStr)
        ? themesStr
        : themesStr?.split(',')

      const content = await this.validatePostUseCase.exec({
        themes,
        content: contentUrl,
        contentFiles: files.contentFiles,
      })

      const post = await this.createPostsUseCase.exec({
        title,
        cover,
        description,
        themes,
        createdBy,
        content,
      })

      res.status(StatusCode.CREATED).json(post)
    } catch (err: any) {
      next(err)
    }
  }
}
