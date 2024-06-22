import { UserRepository } from '../../user/domain/user-repository'
import { BaseException } from '../../../core/domain/contracts/BaseException'
import { PermissionEnum, StatusCode } from '../../common/enums'
import { userRepository } from '../../user/domain'
import { SignInUseCase } from '../useCase/SignIn'

jest.mock('../../user/domain/user-repository')

describe('SignInUseCase', () => {
  let signInUseCase: SignInUseCase
  let userRepositoryMock: jest.Mocked<UserRepository>

  beforeEach(() => {
    userRepositoryMock = userRepository as jest.Mocked<UserRepository>
    signInUseCase = new SignInUseCase(userRepositoryMock)
  })

  it('should login a user with valid credentials', async () => {
    const params = {
      email: 'test@example.com',
      password: 'password123',
    }

    const userResponse = {
      token: 'mock_token',
      email: 'test@example.com',
      username: 'testuser',
      role: {
        name: 'user',
        key: 'ADMIN',
        permissions: [PermissionEnum.C, PermissionEnum.R],
      },
      toObject: () => ({
        token: 'mock_token',
        email: 'test@example.com',
        username: 'testuser',
        role: {
          name: 'user',
          key: 'ADMIN',
          permissions: [PermissionEnum.C, PermissionEnum.R],
        },
        password: 1234,
      }),
    } as unknown as any

    userRepositoryMock.findOneWithRoles.mockResolvedValue(userResponse)
    userRepositoryMock.comparePassword.mockResolvedValue(true)

    const response = await signInUseCase.exec(params)

    delete userResponse?.toObject
    delete userResponse?.password

    expect(userRepositoryMock.findOneWithRoles).toHaveBeenCalled()
    expect(userRepositoryMock.comparePassword).toHaveBeenCalled()
    expect(response).toMatchObject(userResponse)
  })

  it('should throw an exception when user does not exist', async () => {
    userRepositoryMock.findOneWithRoles.mockResolvedValue(null)

    await expect(
      signInUseCase.exec({
        email: 'test@example.com',
        password: 'password',
      })
    ).rejects.toThrow(
      new BaseException(StatusCode.UNAUTHORIZED, 'Invalid credentials')
    )
  })
})
