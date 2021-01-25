import { model, Document, Model, Schema } from "mongoose";

import { ChatInterface } from '../interface/chat';

interface ChatDocument extends ChatInterface, Document {
  _id: string;
}

const { Types: { ObjectId } } = Schema;
const ChatSchema = new Schema({
  roomId: {
    type: ObjectId,
    required: true,
    ref: 'Room'
  },
  user: String,
  message: String,
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const Chat: Model<ChatDocument>  = model('Chat', ChatSchema);

export default Chat;
