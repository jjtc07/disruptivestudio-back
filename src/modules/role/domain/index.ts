export * from './role.model'

import { RoleRepository } from './role-repository'
import { Role } from './role.model'

const roleRepository = new RoleRepository(Role)

export { roleRepository }
