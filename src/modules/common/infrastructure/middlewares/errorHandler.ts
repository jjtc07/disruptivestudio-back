import { Request, Response, NextFunction } from 'express'
import { BaseException } from '../../../../core/domain/contracts/BaseException'

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  // if (process.env.NODE_ENV === 'test') {
  // console.log(err)
  // }

  if (err instanceof BaseException) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        data: err.data,
      },
    })
  }

  return res.status(500).json({
    error: {
      message: 'Internal server error',
    },
  })
}
