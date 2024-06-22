import { Request, Response, NextFunction } from 'express'
import { PermissionEnum } from '../../../common/enums/permissions'
import { RolesEnum } from '../../../role/enums'
import { StatusCode } from '../../enums'

interface ValidatePermissionParams {
  requiredPermissions?: PermissionEnum[]
  onlyAdmin?: boolean
}

export const validatePermission = ({
  requiredPermissions = [],
  onlyAdmin = false,
}: ValidatePermissionParams) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user

    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' })
    }

    if (onlyAdmin && user?.role?.key !== RolesEnum.ADMIN) {
      return res
        .status(StatusCode.FORBIDDEN)
        .json({ message: 'Insufficient permissions' })
    }

    const userPermissions = user?.role?.permissions
    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    )

    if (!hasPermission) {
      return res
        .status(StatusCode.FORBIDDEN)
        .json({ message: 'Insufficient permissions' })
    }

    next()
  }
}
