import { NextFunction, Request, Response } from 'express'
import { GetAllRolesUseCase } from '../../../useCase/GetAllRoles'
import { StatusCode } from '../../../../common/enums'

export class RoleController {
  constructor(private readonly getAllRoleUseCase: GetAllRolesUseCase) {}

  async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const roles = await this.getAllRoleUseCase.exec()

      res.status(StatusCode.OK).json(roles)
    } catch (err) {
      next(err)
    }
  }
}
