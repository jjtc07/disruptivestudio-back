import 'dotenv/config'
import { connectToDatabase } from '../src/core/database/config'

import { roleSeeds } from './roles'
import { userSeeds } from './user'

const seeds = async () => {
  await connectToDatabase()

  await roleSeeds()

  await userSeeds()
}

seeds()
  .then(() => {
    console.log('Seed data loaded successfully')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error loading seed data:', err)
    process.exit(1)
  })
