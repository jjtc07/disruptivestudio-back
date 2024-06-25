import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const optionalAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

    delete decoded?.password

    req.user = decoded
  } catch (err) {
    console.error(err)
  } finally {
    next()
  }
}
