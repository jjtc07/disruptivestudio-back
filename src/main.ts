import 'dotenv/config'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { config } from '@modules/common/infrastructure/config'

function bootstrap() {
  const app = express()

  app.use(bodyParser.json())
  app.use(morgan('dev'))

  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

  const { port } = config.server

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`)
  })
}

bootstrap()
