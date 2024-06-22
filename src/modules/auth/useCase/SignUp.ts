import { BaseException } from '../../../core/domain/contracts/BaseException'
import { StatusCode } from '../../common/enums'
import { IUser } from '../../user/domain/user'
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
  }): Promise<IUser> {
    const userExists = await this.userRepository.findOne({
      $or: [
        { username: { $regex: new RegExp(`^${username}$`, 'i') } },
        { email: { $regex: new RegExp(`^${email}$`, 'i') } },
      ],
    })

    if (userExists) {
      throw new BaseException(
        StatusCode.FORBIDDEN,
        'Email or username already in use'
      )
    }

    const newUser = { username, email, password, role }

    const user = (await this.userRepository.create(newUser)).toObject()

    delete user.password

    return user
  }
}
