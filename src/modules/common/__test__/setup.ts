import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer: MongoMemoryServer

export const setupDatabase = async () => {
  mongoServer = await MongoMemoryServer.create()
  const connectionString = await mongoServer.getUri()

  process.env.MONGODB_URI = connectionString

  return connectionString
}

export const teardownDatabase = async () => {
  await mongoServer.stop()
}
