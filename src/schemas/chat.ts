import mongoose from 'mongoose';

const { model, Schema } = mongoose;
const { Types: { ObjectId }} = Schema;

interface Chat extends mongoose.Document {
  room: any;
  user: string;
  chat: string;
  createdAt: any;
}

const chatSchema = new Schema({
  room: {
    type: ObjectId,
    required: true,
    ref: 'Room'
  },
  user: {
    type: String,
    required: true
  },
  chat: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model<Chat>('Chat', chatSchema);