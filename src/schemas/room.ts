import mongoose from 'mongoose';

import {
  MAFIA,
  FULL,
  PLAYING,
  TABULA,
  WAIT,
  WARE_WOLF
} from '../models/types';

interface Room extends mongoose.Document {
  count: number;
  maxCount: number;
  owner: string;
  roomTitle: string;
  roomType: MAFIA | TABULA | WARE_WOLF;
  status: WAIT | FULL | PLAYING;
}

const { model, Schema } = mongoose;
const roomSchema = new Schema({
  count: {
    type: Number,
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
  roomTitle: {
    type: String,
    required: true
  },
  roomType: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  }
});

export default model<Room>('Room', roomSchema);