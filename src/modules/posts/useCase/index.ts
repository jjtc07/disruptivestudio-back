export * from './CreatePosts'
export * from './GetAllPosts'
export * from './GetOnePosts'

import { postRepository } from '../domain'
import { CreatePostsUseCase } from './CreatePosts'
import { GetAllPostsUseCase } from './GetAllPosts'
import { GetOnePostsUseCase } from './GetOnePosts'

const getAllPostsUseCase = new GetAllPostsUseCase(postRepository)
const getOnePostsUseCase = new GetOnePostsUseCase(postRepository)
const createPostsUseCase = new CreatePostsUseCase(postRepository)

export { getAllPostsUseCase, getOnePostsUseCase, createPostsUseCase }
