import mongoose from 'mongoose'

const songSchema = new mongoose.Schema({
  songUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
  title: { type: String }
})

const Song = mongoose.model('Song', songSchema)

export default Song
