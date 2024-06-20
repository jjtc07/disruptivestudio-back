import jwt from 'jsonwebtoken'
import { UserRepository } from '../../user/domain/user-repository'
import { User } from '../../user/domain/user'
import { config } from '../../common/infrastructure/config'
import { BaseException } from '../../../core/domain/contracts/BaseException'

export class SignInUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async exec({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<User> {
    const userExist = await this.userRepository.findOneWithRoles({
      email: { $regex: new RegExp(`^${email}$`, 'i') },
    })

    if (!userExist) {
      throw new BaseException(401, 'Invalid credentials')
    }

    const isMatch = await this.userRepository.comparePassword(
      userExist,
      password
    )

    const user = userExist.toObject()

    if (!isMatch) {
      throw Error('Invalid credentials')
    }

    const token = jwt.sign(
      {
        _id: user._id,
        id: user._id,
        username: user._id,
        email: user._id,
        role: {
          name: user.role.name,
          key: user.role.key,
          permissions: user.role.permissions,
        },
      },
      config.auth.JWT_SECRET
    )
    delete user?.password
    delete user?.createdAt
    delete user?.updatedAt

    delete user?.role?._id
    delete user?.role?.createdAt
    delete user?.role?.updatedAt

    return {
      token,
      ...user,
    }
  }

  async me(userId: string): Promise<User> {
    const userExists = await this.userRepository.findOne({
      _id: userId,
    })

    if (!userExists) {
      throw new Error('User id not found')
    }

    const user = userExists.toObject()

    delete user.password
    delete user.createdAt
    delete user.updatedAt

    return user
  }
}
