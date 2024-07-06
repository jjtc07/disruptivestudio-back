export const config = {
  server: {
    port: process.env.PORT || 3003,
  },
  database: {
    uri:
      process.env.NODE_ENV === 'test'
        ? process.env.MONGODB_URI_TESTS
        : process.env.MONGODB_URI,
  },
  auth: {
    JWT_SECRET: process.env.JWT_SECRET || '1233',
    JWT_EXPIRES_IN: 31536000, // 1 año en segundos
  },
}
