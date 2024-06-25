import { Router } from 'express'
import authRouter from './auth/auth-router'
import s3Router from './s3/s3-router'
// other routers can be imported here

const globalRouter = Router()

globalRouter.use('/auth', authRouter) // Ensure correct route prefix
globalRouter.use('/s3', s3Router)
// other routers can be added here

export default globalRouter
