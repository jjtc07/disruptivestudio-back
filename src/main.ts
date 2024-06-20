import 'dotenv/config'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

import { connectToDatabase } from './core/database/config'
import { config } from './modules/common/infrastructure/config'
import { swaggerDocs } from './modules/common/infrastructure/swaggerConfig'
import { errorHandler } from './modules/common/infrastructure/middlewares'
import { v1Router } from './modules/common/infrastructure/routes'

function bootstrap() {
  const app = express()
  connectToDatabase()

  app.use(express.json())
  app.use(cors())
  app.use(morgan('dev'))

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

  app.use('/api', v1Router)

  app.use(errorHandler)

  const { port } = config.server

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`)
  })
}

bootstrap()
