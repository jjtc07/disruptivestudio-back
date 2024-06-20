import { Router } from 'express'
import { routerV1 } from './v1'

const v1Router: Router = Router()

v1Router.use('/v1', routerV1)

export { v1Router }
