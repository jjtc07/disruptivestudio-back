import { Router } from 'express'
import authRouter from '../../../auth/infrastructure/v1'

const routerV1: Router = Router()

routerV1.use('/auth', authRouter)

export { routerV1 }
