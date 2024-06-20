export const config = {
  server: {
    port: process.env.PORT || 3000,
  },
  database: {
    uri: process.env.MONGO_URI,
  },
  auth: {
    JWT_SECRET: process.env.JWT_SECRET || '1233',
  },
}
