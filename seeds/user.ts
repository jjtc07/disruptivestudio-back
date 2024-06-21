import 'dotenv/config'
import { connectToDatabase } from '../src/core/database/config'
import { roleRepository } from '../src/modules/role/domain'
import { userRepository } from '../src/modules/user/domain'

export const userSeeds = async () => {
  connectToDatabase()

  const adminRole = await roleRepository.findOne({
    key: 'ADMIN',
  })

  if (!adminRole) {
    throw new Error('Role not found. Execute seeds/roles.seed.ts')
  }

  const users: any = [
    {
      username: 'admin',
      email: 'admin@example.com',
      password: '123456',
      role: adminRole._id,
    },
  ]

  for await (const user of users) {
    const userExist = await userRepository.findOne({
      $or: [
        { username: { $regex: new RegExp(`^${user.username}$`, 'i') } },
        { email: { $regex: new RegExp(`^${user.email}$`, 'i') } },
      ],
    })

    if (userExist) {
      continue
    }

    await userRepository.create(user)
  }
}
