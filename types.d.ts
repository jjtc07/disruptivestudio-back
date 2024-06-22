import { Request } from 'express'
import { User } from './src/modules/user/domain'

declare global {
  namespace Express {
    interface Request {
      user: any
    }
  }
}
