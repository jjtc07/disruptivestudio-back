export const config = {
  server: {
    port: process.env.PORT || 3000,
  },
  database: {
    uri: process.env.MONGO_URI,
  },
}
