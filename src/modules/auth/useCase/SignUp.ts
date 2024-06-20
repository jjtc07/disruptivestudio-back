import { User } from '../../user/domain/user'
import { UserRepository } from '../../user/domain/user-repository'

export class SignUpUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async exec({
    username,
    email,
    password,
    role,
  }: {
    username: string
    email: string
    password: string
    role: string
  }): Promise<User> {
    const userExists = await this.userRepository.findOne({
      $or: [
        { username: { $regex: new RegExp(`^${username}$`, 'i') } },
        { email: { $regex: new RegExp(`^${email}$`, 'i') } },
      ],
    })

    if (userExists) {
      throw new Error('Email or username already in use')
    }

    const newUser = { username, email, password, role }

    const user = (await this.userRepository.create(newUser)).toObject()

    delete user.password

    return user
  }
}
