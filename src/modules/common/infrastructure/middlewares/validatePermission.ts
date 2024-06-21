import { Request, Response, NextFunction } from 'express'
import { PermissionEnum } from '../../../common/enums/permissions'

interface OptionParam {
  onlyAdmin?: boolean
}

export const validatePermission = (
  requiredPermissions: PermissionEnum[],
  options?: OptionParam
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user

    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' })
    }

    if (options?.onlyAdmin && user?.role?.key !== 'ADMIN') {
      return res.status(403).json({ message: 'Insufficient permissions' })
    }

    const userPermissions = user?.role?.permissions
    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    )

    if (!hasPermission) {
      return res.status(403).json({ message: 'Insufficient permissions' })
    }

    next()
  }
}
