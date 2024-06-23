import 'dotenv/config'
import { connectToDatabase } from '../src/core/database/config'

import { roleSeeds } from './roles'
import { userSeeds } from './user'
import { themesSeeds } from './themes'
import { postsSeeds } from './posts'
import { categoriesSeeds } from './categories'

const seeds = async () => {
  await connectToDatabase()

  await roleSeeds()

  await userSeeds()

  await categoriesSeeds()

  await themesSeeds()

  await postsSeeds()
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
