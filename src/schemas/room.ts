import mongoose from 'mongoose';

interface Room extends mongoose.Document {
  title: string;
}

const { model, Schema } = mongoose;
const roomSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  maxCount: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
    required: true
  },
});

export default model<Room>('Room', roomSchema);