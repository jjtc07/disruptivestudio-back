import { faker } from '@faker-js/faker/locale/es_MX'
import { RolesEnum } from '../../role/enums'
import { PermissionEnum } from '../../common/enums'

export const userStub = ({
  email = faker.internet.email(),
  username = faker.internet.userName(),
  password = faker.internet.password({ length: 10 }),
  role = {
    name: RolesEnum.ADMIN,
    key: RolesEnum.ADMIN,
    permissions: [
      PermissionEnum.C,
      PermissionEnum.R,
      PermissionEnum.U,
      PermissionEnum.D,
    ],
  },
}) => {
  return {
    email,
    username,
    password,
    role,
  }
}
