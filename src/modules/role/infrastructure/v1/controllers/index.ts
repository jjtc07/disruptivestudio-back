import { getAllRolesUseCase } from '../../../useCase'
import { RoleController } from './RoleController'

const roleController = new RoleController(getAllRolesUseCase)

export { roleController }
