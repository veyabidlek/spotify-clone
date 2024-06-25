import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL ||
        'mongodb+srv://veyabidlek:Cristiano1985@spotify-clone.iz6z3l5.mongodb.net/'
    )
    console.log('MongoDB connected...')
  } catch (err: any) {
    console.error(err.message)
    process.exit(1)
  }
}

export default connectDB
