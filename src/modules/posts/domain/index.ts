import { PostsRepository } from './posts-repository'
import { Posts } from './posts.model'

export * from './posts.model'

const postRepository = new PostsRepository(Posts)

export { postRepository }
