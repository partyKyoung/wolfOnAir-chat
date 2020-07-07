import mongoose from 'mongoose';

interface Room extends mongoose.Document {
  roomType: string;
  roomTitle: string;
  maxCount: number;
  owner: string;
}

const { model, Schema } = mongoose;
const roomSchema = new Schema({
  roomType: {
    type: String,
    required: true
  },
  roomTitle: {
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