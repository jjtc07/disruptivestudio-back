import 'dotenv/config'

import express, { Express } from 'express'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import cookieParser from 'cookie-parser'

import { connectToDatabase } from './core/database/config'
import { config } from './modules/common/infrastructure/config'
import { swaggerDocs } from './modules/common/infrastructure/swaggerConfig'
import { errorHandler } from './modules/common/infrastructure/middlewares'
import { v1Router } from './modules/common/infrastructure/routes'

export const createApp = (): Express => {
  const app = express()
  connectToDatabase()

  app.use(express.json())
  app.use(cors())
  app.use(cookieParser())
  app.use(morgan('dev'))

  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

  app.use('/api', v1Router)

  app.use(errorHandler)

  return app
}

const app = createApp()
const { port } = config.server

export const server = app.listen(port, () => {
  console.log(`[APP] - Starting application on port ${port}`)
})
