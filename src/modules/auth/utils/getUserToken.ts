import jwt from 'jsonwebtoken'
import { config } from '../../common/infrastructure/config'

export const getUserToken = (user: any): string => {
  const token = jwt.sign(
    {
      _id: user._id,
      id: user._id,
      username: user._id,
      email: user._id,
      role: {
        name: user.role.name,
        key: user.role.key,
        permissions: user.role.permissions,
      },
    },
    config.auth.JWT_SECRET
  )

  return token
}
