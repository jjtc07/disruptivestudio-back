import mongoose from 'mongoose'

import { config } from '../../modules/common/infrastructure/config'

const MONGODB_URI = config.database.uri ?? 'mongodb://localhost:27017/testTest'

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {})

    console.log('Connected to the database')
  } catch (error) {
    console.error('Error connecting to the database:', error)
    process.exit(1)
  }
}

export { connectToDatabase }
