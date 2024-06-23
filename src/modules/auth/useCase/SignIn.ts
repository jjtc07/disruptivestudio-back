import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserRepository } from '../../user/domain/user-repository'
import { IUser } from '../../user/domain/user'
import { config } from '../../common/infrastructure/config'
import { BaseException } from '../../../core/domain/contracts/BaseException'
import { StatusCode } from '../../common/enums'
import { ACCESS_TOKEN } from '../utils/constants'

interface SignInUseCaseParams {
  email: string
  password: string
  res?: Response
}

export class SignInUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async exec({ email, password, res }: SignInUseCaseParams): Promise<IUser> {
    const userExist = await this.userRepository.findOneWithRoles({
      email: { $regex: new RegExp(`^${email}$`, 'i') },
    })

    if (!userExist) {
      throw new BaseException(StatusCode.UNAUTHORIZED, 'Invalid credentials')
    }

    const isMatch = await this.userRepository.comparePassword(
      userExist,
      password
    )

    if (!isMatch) {
      throw new BaseException(StatusCode.UNAUTHORIZED, 'Invalid credentials')
    }

    const user = userExist.toObject()

    const token = jwt.sign(
      {
        _id: user._id,
        id: user._id,
        username: user.username,
        email: user.email,
        role: {
          name: user.role.name,
          key: user.role.key,
          permissions: user.role.permissions,
        },
      },
      config.auth.JWT_SECRET
    )

    if (res) {
      res?.cookie(ACCESS_TOKEN, token, {
        httpOnly: true,
        secure: false,
        maxAge: config.auth.JWT_EXPIRES_IN * 1000,
      })
    }

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

  async me(userId: string): Promise<IUser> {
    const userExists = await this.userRepository.findOne({
      _id: userId,
    })

    if (!userExists) {
      throw new BaseException(StatusCode.UNAUTHORIZED, 'User not found')
    }

    const user = userExists.toObject()

    delete user.password
    delete user.createdAt
    delete user.updatedAt

    return user
  }
}
