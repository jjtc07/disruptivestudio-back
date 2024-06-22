import {
  getAllPostsUseCase,
  getOnePostsUseCase,
  createPostsUseCase,
} from '../../../useCase'
import { PostsController } from './PostsController'

const postsController = new PostsController(
  getAllPostsUseCase,
  getOnePostsUseCase,
  createPostsUseCase
)

export { postsController }
