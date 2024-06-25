import { Router } from 'express'
import S3Controller from './s3-controller'
import S3Service from './s3-service'
import multer from 'multer'
import { authMiddleware } from '../middlewares/auth-middleware'

const s3Router = Router()

const s3Service = new S3Service()
const s3Controller = new S3Controller(s3Service)

const storage = multer.memoryStorage()
const upload = multer({ storage })

s3Router.post(
  '/upload',
  authMiddleware,
  upload.fields([{ name: 'song' }, { name: 'image' }]),
  s3Controller.UploadFile
)
s3Router.post('/update', s3Controller.UpdateFile)
s3Router.post('/delete', s3Controller.DeleteFile)
s3Router.get('/songs', s3Controller.ListSongs)

export default s3Router
