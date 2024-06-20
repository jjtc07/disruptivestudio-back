import { Request, Response, NextFunction } from 'express'
import { BaseException } from '../../../../core/domain/contracts/BaseException'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err)

  console.log('err instanceof BaseException: ', err instanceof BaseException)

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
