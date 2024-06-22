import { roleRepository } from '../domain'
import { GetAllRolesUseCase } from './GetAllRoles'

const getAllRolesUseCase = new GetAllRolesUseCase(roleRepository)

export { getAllRolesUseCase }
