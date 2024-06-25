export * from './CreatePosts'
export * from './GetAllPosts'
export * from './GetOnePosts'
export * from './ValidatePostUseCase'

import { themeRepository } from '../../theme/domain'
import { postRepository } from '../domain'
import { CreatePostsUseCase } from './CreatePosts'
import { GetAllPostsUseCase } from './GetAllPosts'
import { GetOnePostsUseCase } from './GetOnePosts'
import { GetInfoPostsUseCase } from './GetInfoPosts'
import { ValidatePostUseCase } from './ValidatePostUseCase'

const getAllPostsUseCase = new GetAllPostsUseCase(postRepository)
const getInfoPostsUseCase = new GetInfoPostsUseCase(postRepository)
const getOnePostsUseCase = new GetOnePostsUseCase(postRepository)
const createPostsUseCase = new CreatePostsUseCase(postRepository)
const validatePostUseCase = new ValidatePostUseCase(themeRepository)

export {
  getAllPostsUseCase,
  getInfoPostsUseCase,
  getOnePostsUseCase,
  createPostsUseCase,
  validatePostUseCase,
}
