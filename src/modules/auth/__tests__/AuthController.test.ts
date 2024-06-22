import { Request, Response, NextFunction } from 'express'
import { AuthController } from '../infrastructure/v1/controllers/AuthController'
import { SignInUseCase } from '../useCase/SignIn'
import { SignUpUseCase } from '../useCase/SignUp'
import { userRepository } from '../../user/domain'
import { PermissionEnum, StatusCode } from '../../common/enums'
import { UserRepository } from '../../user/domain/user-repository'
import { BaseException } from '../../../core/domain/contracts/BaseException'

jest.mock('../../user/domain/user-repository')
jest.mock('../useCase/SignIn')

describe('AuthController', () => {
  let authController: AuthController
  let req: Partial<Request>
  let res: Partial<Response>
  let next: NextFunction
  let userRepositoryMock: jest.Mocked<UserRepository>
  let signInUseCaseMock: jest.Mocked<SignInUseCase>

  beforeEach(() => {
    userRepositoryMock = userRepository as jest.Mocked<UserRepository>
    signInUseCaseMock = new SignInUseCase(
      userRepositoryMock
    ) as jest.Mocked<SignInUseCase>

    authController = new AuthController(
      signInUseCaseMock,
      new SignUpUseCase(userRepository)
    )

    req = {
      body: {},
    } as Partial<Request>

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>

    next = jest.fn()
  })

  describe('login', () => {
    it('should login a user with valid credentials', async () => {
      req.body = {
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
      } as unknown as any

      signInUseCaseMock.exec.mockResolvedValue(userResponse)

      await authController.login(req as Request, res as Response, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(userResponse)
    })

    it('should handle errors in login', async () => {
      signInUseCaseMock.exec.mockRejectedValue(
        new BaseException(StatusCode.UNAUTHORIZED, 'Invalid credentials')
      )

      const next = jest.fn()

      req.body = {
        email: 'test@example.com',
        password: '123456789',
      }

      await authController.login(req as Request, res as Response, next)

      expect(signInUseCaseMock.exec).toHaveBeenCalled()
      expect(signInUseCaseMock.exec).toHaveBeenCalledWith(req.body)
      expect(next).toHaveBeenCalledWith(
        new BaseException(StatusCode.UNAUTHORIZED, 'Invalid credentials')
      )
    })
  })
})
