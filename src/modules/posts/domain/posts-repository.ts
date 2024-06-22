import { Repository } from '../../../core/domain/contracts/Repository'
import { PostsDocument } from './posts.model'

export class PostsRepository extends Repository<PostsDocument> {}
