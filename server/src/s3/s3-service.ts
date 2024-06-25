import { Upload } from '@aws-sdk/lib-storage'
import dotenv from 'dotenv'
import { s3 } from '../middlewares/s3-middleware'
import mime from 'mime'

dotenv.config()

class S3Service {
  async uploadFile(Bucket: string, name: string, file: Buffer) {
    const contentType = mime.lookup(name)
    await new Upload({
      client: s3,
      params: {
        Bucket,
        Key: name,
        Body: file,
        ContentType: contentType,
        ACL: 'public-read'
      }
    })
      .done()
      .then((res) => console.log(res))
      .catch((err) => console.log(`Error uploading a file: ${err.Code}`))
  }

  async updateFile(Bucket: string, name: string, file: Buffer) {
    await s3
      .putObject({
        Bucket,
        Key: name,
        Body: file
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(`Error updating a file: ${err.Code}`))
  }

  async deleteFile(Bucket: string, name: string) {
    await s3
      .deleteObject({ Bucket, Key: name })
      .then((res) => console.log(res))
      .catch((err) => console.log(`Error deleting a file: ${err.Code}`))
  }

  async listSongs(Bucket: string) {
    s3.listObjectsV2({ Bucket }, (err, data) => {
      if (err) throw new Error(err)

      const songs = data?.Contents?.map((item) => {
        return {
          name: item.Key,
          url: `https://${Bucket}.s3.amazonaws.com/${item.Key}`
        }
      })
    })
  }
}

export default S3Service
