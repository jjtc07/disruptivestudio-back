import { NextFunction, Request, Response } from 'express'
import { SignInUseCase } from '../../../useCase/SignIn'
import { SignUpUseCase } from '../../../useCase/SignUp'
import { StatusCode } from '../../../../common/enums'

export class AuthController {
  constructor(
    private readonly signIn: SignInUseCase,
    private readonly signUp: SignUpUseCase
  ) {}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      const user = await this.signIn.exec({
        email,
        password,
      })

      res.status(StatusCode.OK).json(user)
    } catch (err) {
      next(err)
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password, role } = req.body

      const user = await this.signUp.exec({
        username,
        email,
        password,
        role,
      })

      res.status(StatusCode.CREATED).json(user)
    } catch (err: any) {
      next(err)
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req

      res.status(StatusCode.OK).json(user)
    } catch (err: any) {
      next(err)
    }
  }
}
