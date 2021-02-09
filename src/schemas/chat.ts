import { model, Document, Model, Schema } from "mongoose";

import { ChatInterface } from '../interface/chat';

interface ChatDocument extends ChatInterface, Document {

};

const ChatSchema = new Schema({
  room: {
    type: String,
    required: true
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
