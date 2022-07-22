import { Router } from 'express'

import authRoutes from './auth.route'
import userRoutes from './user.route'
import server from '../config/server'

const routes = Router()

routes.use(server.routes.auth, authRoutes)

routes.use(server.routes.user, userRoutes)

export default routes
