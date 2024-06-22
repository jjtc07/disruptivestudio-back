import 'dotenv/config'
import { roleRepository } from '../src/modules/role/domain'
import { PermissionEnum } from '../src/modules/common/enums'

export const roleSeeds = async () => {
  const date = new Date()
  let resultRoles = []

  const roles = [
    {
      name: 'Admin',
      key: 'ADMIN',
      permissions: [
        PermissionEnum.C,
        PermissionEnum.R,
        PermissionEnum.U,
        PermissionEnum.D,
      ],
      createdAt: date,
      updatedAt: date,
    },
    {
      name: 'Lector',
      key: 'READER',
      permissions: [PermissionEnum.R],
      createdAt: date,
      updatedAt: date,
    },
    {
      name: 'Creador',
      key: 'CREATOR',
      permissions: [PermissionEnum.C, PermissionEnum.R, PermissionEnum.U],
      createdAt: date,
      updatedAt: date,
    },
  ]

  for await (const role of roles) {
    const roleExist = await roleRepository.findOne({
      key: { $regex: new RegExp(`^${role.key}$`, 'i') },
    })

    if (roleExist) {
      resultRoles.push(roleExist)

      continue
    }

    resultRoles.push(await roleRepository.create(role))
  }

  return resultRoles
}
