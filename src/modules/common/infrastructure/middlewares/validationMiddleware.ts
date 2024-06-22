import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'
import { StatusCode } from '../../enums'

export const validateSchema =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)

      next()
    } catch (e: any) {
      res.status(StatusCode.BAD_REQUEST).json({ error: e.errors })
    }
  }
