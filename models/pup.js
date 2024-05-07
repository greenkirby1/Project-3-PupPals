import mongoose from "mongoose";

const pupSchema = new mongoose.Schema({
  pupName: {
    type: String,
    required: true
  },
  image: String,
  birthday: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  neutered: {
    type: Boolean,
    default: false
  },
  favorites: [String],
  dislikes: [String],
  bones: { type: Number },
  owner: {
    type: mongoose.ObjectId,
    ref: 'User',
    required: true
  }
})

export default mongoose.model('Pup', pupSchema)