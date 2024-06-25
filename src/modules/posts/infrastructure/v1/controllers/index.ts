import {
  getAllPostsUseCase,
  getOnePostsUseCase,
  createPostsUseCase,
  validatePostUseCase,
  getInfoPostsUseCase,
} from '../../../useCase'
import { PostsController } from './PostsController'

const postsController = new PostsController(
  getAllPostsUseCase,
  getOnePostsUseCase,
  createPostsUseCase,
  validatePostUseCase,
  getInfoPostsUseCase
)

export { postsController }
