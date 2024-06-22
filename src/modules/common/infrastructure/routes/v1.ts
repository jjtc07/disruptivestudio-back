import { Router } from 'express'

import authRouter from '../../../auth/infrastructure/v1'
import categoryRouter from '../../../category/infrastructure/v1'
import themeRouter from '../../../theme/infrastructure/v1'
import roleRouter from '../../../role/infrastructure/v1'

const routerV1: Router = Router()

routerV1.use('/auth', authRouter)
routerV1.use('/categories', categoryRouter)
routerV1.use('/themes', themeRouter)
routerV1.use('/roles', roleRouter)

export { routerV1 }
