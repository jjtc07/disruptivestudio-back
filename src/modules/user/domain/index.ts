import { UserRepository } from './user-repository'
import { User } from './user.model'
export * from './user.model'

const userRepository = new UserRepository(User)

export { userRepository }
