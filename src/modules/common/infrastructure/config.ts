export const config = {
  server: {
    port: process.env.PORT || 3003,
  },
  database: {
    uri: process.env.MONGODB_URI,
  },
  auth: {
    JWT_SECRET: process.env.JWT_SECRET || '1233',
  },
}
