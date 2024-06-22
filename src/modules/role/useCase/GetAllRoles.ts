import { IRole } from '../domain'
import { RoleRepository } from '../domain/role-repository'
import { RolesEnum } from '../enums'

export class GetAllRolesUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async exec(): Promise<Array<IRole>> {
    const roles = this.roleRepository.find(
      { key: { $ne: RolesEnum.ADMIN } },
      { _id: 1, name: 1, key: 1 }
    )

    return roles
  }
}
