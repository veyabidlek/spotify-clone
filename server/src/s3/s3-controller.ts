import { Request, Response } from 'express'
import S3Service from './s3-service'
import Song from './models/song'

class S3Controller {
  private s3Service: S3Service

  constructor(s3Service: S3Service) {
    this.s3Service = s3Service
  }

  UploadFile = async (req: Request, res: Response): Promise<void> => {
    const songFile = req.files!['song'][0]
    const imageFile = req.files!['image'][0]
    const songName = req.body.name
    const bucketName = process.env.AWS_BUCKET_NAME!

    try {
      const songKey = songFile.originalname
      const imageKey = imageFile.originalname

      await this.s3Service.uploadFile(bucketName, songKey, songFile.buffer)
      await this.s3Service.uploadFile(bucketName, imageKey, imageFile.buffer)

      const songUrl = `https://${bucketName}.s3.amazonaws.com/${songKey}`
      const imageUrl = `https://${bucketName}.s3.amazonaws.com/${imageKey}`

      const newSong = new Song({ songUrl, imageUrl, title: songName })
      await newSong.save()
      res.status(200).json({ songUrl, imageUrl })
    } catch (error) {
      res.status(500).json({ message: 'Error uploading file' })
    }
  }

  UpdateFile = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body)
      this.s3Service.updateFile(req.body.Bucket, req.body.name, req.body.file)
      res.status(200).json({ message: 'File updated' })
    } catch (error) {
      res.status(500).json({ message: 'Error updating file' })
    }
  }

  DeleteFile = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body)
      this.s3Service.deleteFile(req.body.Bucket, req.body.name)
      res.status(200).json({ message: 'File deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Error deleting file' })
    }
  }

  ListSongs = async (req: Request, res: Response): Promise<void> => {
    try {
      //   this.s3Service.listSongs(process.env.AWS_BUCKET_NAME!)
      const songs = await Song.find()
      res.status(200).json({ songs })
    } catch (error) {
      res.status(500).json({ message: 'Error listing songs' })
    }
  }
}

export default S3Controller
