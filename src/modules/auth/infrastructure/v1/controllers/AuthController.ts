import { NextFunction, Request, Response } from 'express'
import { SignInUseCase } from '../../../useCase/SignIn'
import { SignUpUseCase } from '../../../useCase/SignUp'

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

      res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { username, email, password, role } = req.body

      const user = await this.signUp.exec({
        username,
        email,
        password,
        role,
      })

      res.status(200).json(user)
    } catch (err: any) {
      res.status(400).json(err.message)
    }
  }

  async me(req: Request, res: Response) {
    try {
      const { user } = req

      res.status(200).json(user)
    } catch (err: any) {
      res.status(400).json(err.message)
    }
  }
}
