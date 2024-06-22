import 'dotenv/config'

import { connectToDatabase } from '../src/core/database/config'
import { roleRepository } from '../src/modules/role/domain'
import { RolesEnum } from '../src/modules/role/enums'
import { faker } from '@faker-js/faker'
import { signUpUseCase } from '../src/modules/auth/useCase'

export const userSeeds = async () => {
  connectToDatabase()
  let resultUser = []

  const adminRole = await roleRepository.findOne({
    key: RolesEnum.ADMIN,
  })

  const readerRole = await roleRepository.findOne({
    key: RolesEnum.READER,
  })

  const creatorRole = await roleRepository.findOne({
    key: RolesEnum.CREATOR,
  })

  if (!adminRole || !readerRole || !creatorRole) {
    throw new Error('Role not found. Execute seeds/roles.seed.ts')
  }

  const users: any = [
    {
      username: 'admin',
      email: 'admin@example.com',
      password: '123456',
      role: adminRole._id,
    },
    {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'reader123456',
      role: readerRole._id,
    },
    {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'creator123456',
      role: creatorRole._id,
    },
  ]

  for await (const user of users) {
    try {
      const newUser = await signUpUseCase.exec(user)

      resultUser.push(newUser)
    } catch (err) {
      continue
    }
  }

  return resultUser
}
